# OK 1. Histórico da quantidade de alunos que reprovam em certo professor; aluno/reprovacao/professor
# OK 2. Histórico da quantidade de alunos que reprovam em certa disciplina;aluno/reprovacao/disciplina OK
# OK 3. Porcentagem de conclusão do curso por aluno;                       aluno/conclusao             OK 
# OK 4. Tempo médio de conclusão por curso;                                curso/tempo_medio
# OK 5. Tempo de conclusão por aluno de forma individual;                  aluno/tempo_medio
# NÃO OK 6. Relação de quantos formaram X quantos deveriam formar;             curso/formacao
# OK 7. Relação de total de alunos cursantes e formados;                   curso/total_cursantes
# OK 9. Quantidade de alunos por período                                   curso/periodo/total_alunos
from dotenv import load_dotenv
import os

load_dotenv()

def getenv(nome_variavel):
    load_dotenv()
    valor = os.getenv(nome_variavel)
    return valor




ALUNO_IDENTIFICADOR = os.getenv('ALUNO_IDENTIFICADOR')



reprovacao_por_disciplina = f'''
    select 
    h.{getenv('HISTORICO_PERIODO')},
    d.{getenv('DISCIPLINA_NOME')},
    COUNT(h.{getenv('HISTORICO_IDENTIFICADOR_ALUNO')}) AS num_disciplinas
    from {getenv('GCP_PROJECT_ID')}.{getenv('TABELA_HISTORICO')} as h
    JOIN {getenv('TABELA_DISCIPLINAS')} as d on d.{getenv('DISCIPLINA_IDENTIFICADOR')} = h.{getenv('HISTORICO_IDENTIFICADOR_DISCIPLINA')} 
    WHERE h.{getenv('HISTORICO_NOTA_DISCIPLINA')} < 6
    GROUP BY h.{getenv('HISTORICO_PERIODO')}, d.{getenv('DISCIPLINA_IDENTIFICADOR')},d.{getenv('DISCIPLINA_NOME')}
'''

reprovacao_por_professor = f'''
select 
    h.{getenv('HISTORICO_PERIODO')},
    p.{getenv('PROFESSOR_NOME')},
    COUNT(h.{getenv('HISTORICO_IDENTIFICADOR_ALUNO')}) AS num_disciplinas
    from {getenv('GCP_PROJECT_ID')}.{getenv('TABELA_HISTORICO')} as h
    JOIN {getenv('TABELA_PROFESORES')} as p on p.{getenv('PROFESSOR_IDENTIFICADOR')} = h.{getenv('HISTORICO_IDENTIFICADOR_PROFESSOR')} 
    WHERE h.{getenv('HISTORICO_NOTA_DISCIPLINA')} < 6
    GROUP BY h.{getenv('HISTORICO_PERIODO')}, p.{getenv('PROFESSOR_IDENTIFICADOR')},p.{getenv('PROFESSOR_NOME')}
'''
porcentagem_aluno_carga_horaria = f'''
select
    c.{getenv('CURSO_NOME')},
    a.{getenv('ALUNO_NOME')},
    round(sum(a.{getenv('ALUNO_HORAS_CONCLUIDAS')}/c.{getenv('CURSO_CARGA_HORARIA')} *100),1) as porcentagem_conclusao
    
    from `{getenv('GCP_PROJECT_ID')}.{getenv('TABELA_ALUNOS')}` as a
    JOIN `{getenv('TABELA_CURSO')}` as c on a.{getenv('ALUNO_ID_CURSO')} = c.{getenv('CURSO_IDENTIFICADOR')}
    GROUP BY c.{getenv('CURSO_NOME')},a.{getenv('ALUNO_IDENTIFICADOR')},a.{getenv('ALUNO_NOME')}
'''

Tempo_medio_conclusao_curso = f'''
SELECT 
    c.{getenv('CURSO_NOME')},
    avg(DATE_DIFF(a.{getenv('ALUNO_DATA_SAIDA')},a.{getenv('ALUNO_DATA_ENTRADA')},YEAR)) as tempo_medio

    from `{getenv('GCP_PROJECT_ID')}.{getenv('TABELA_ALUNOS')}` as a
    JOIN `{getenv('TABELA_CURSO')}` as c on a.{getenv('ALUNO_ID_CURSO')} = c.{getenv('CURSO_IDENTIFICADOR')}
    WHERE a.{getenv('ALUNO_DATA_SAIDA')} IS NOT NULL
    GROUP BY c.{getenv('CURSO_NOME')}
'''

Tempo_conclusão_aluno_individual = f'''
select
    a.{getenv('ALUNO_NOME')},
    DATE_DIFF(a.{getenv('ALUNO_DATA_SAIDA')},a.{getenv('ALUNO_DATA_ENTRADA')},YEAR) as tempo_conclusao,
    c.{getenv('CURSO_TEMPO')},
    c.{getenv('CURSO_NOME')}
    from `{getenv('GCP_PROJECT_ID')}.{getenv('TABELA_ALUNOS')}` as a
    JOIN `{getenv('TABELA_CURSO')}` as c on a.{getenv('ALUNO_ID_CURSO')} = c.{getenv('CURSO_IDENTIFICADOR')}
    WHERE DATE_DIFF(a.{getenv('ALUNO_DATA_SAIDA')},a.{getenv('ALUNO_DATA_ENTRADA')},YEAR) IS NOT NULL
'''

Total_alunos_cursantes_e_formados = f'''
select
    c.{getenv('CURSO_NOME')},
    concat(EXTRACT(YEAR FROM a.{getenv('ALUNO_DATA_ENTRADA')}),'-',EXTRACT(MONTH FROM a.{getenv('ALUNO_DATA_ENTRADA')})) as data_periodo,
    COUNT( CASE WHEN a.{getenv('ALUNO_STATUS')} = 'Concluido' THEN a.{getenv('ALUNO_IDENTIFICADOR')} END) AS formados,
    COUNT( CASE WHEN a.{getenv('ALUNO_STATUS')} != 'Concluido' THEN a.{getenv('ALUNO_IDENTIFICADOR')} END) AS cursante
    from `{getenv('GCP_PROJECT_ID')}.{getenv('TABELA_ALUNOS')}` as a
    JOIN `{getenv('TABELA_CURSO')}` as c on a.{getenv('ALUNO_ID_CURSO')} = c.{getenv('CURSO_IDENTIFICADOR')}
    group by c.{getenv('CURSO_IDENTIFICADOR')},c.{getenv('CURSO_NOME')},data_periodo
'''
# {getenv('ALUNO_IDENTIFICADOR')}

Quantidade_alunos_por_periodo = f'''
select
    c.{getenv('CURSO_NOME')},
    COUNT(a.{getenv('ALUNO_IDENTIFICADOR')} ) AS cursante,
    a.{getenv('ALUNO_PERIODO_ATUAL')}
    from `{getenv('GCP_PROJECT_ID')}.{getenv('TABELA_ALUNOS')}` as a
    JOIN `{getenv('TABELA_CURSO')}` as c on a.{getenv('ALUNO_ID_CURSO')} = c.{getenv('CURSO_IDENTIFICADOR')}
    group by a.{getenv('ALUNO_PERIODO_ATUAL')},c.{getenv('CURSO_NOME')}
'''