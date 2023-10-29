import pandas as pd
from google.cloud import bigquery
from google.oauth2 import service_account
import matplotlib.pyplot as plt
from flask import Flask, jsonify
from queries import *
import requests
import os
from dotenv import load_dotenv

api_base_url = 'http://localhost:5000/'
load_dotenv()


SERVICE_ACCOUNT_FILE = os.getenv('SERVICE_ACCOUNT_FILE')


credentials = service_account.Credentials.from_service_account_file(filename=f'{SERVICE_ACCOUNT_FILE}',
                                                                    scopes=['https://www.googleapis.com/auth/cloud-platform'])

# 1. Histórico da quantidade de alunos que reprovam em certo professor; aluno/reprovacao/professor
# 2. Histórico da quantidade de alunos que reprovam em certa disciplina;aluno/reprovacao/disciplina
# 3. Porcentagem de conclusão do curso por aluno;                       aluno/conclusao
# 4. Tempo médio de conclusão por curso;                                curso/tempo_medio
# 5. Tempo de conclusão por aluno de forma individual;                  aluno/tempo_medio
# 6. Relação de quantos formaram X quantos deveriam formar;             curso/formacao
# 7. Relação de total de alunos cursantes e formados;                   curso/total_cursantes
# 9. Quantidade de alunos por período                                   curso/periodo/total_alunos


def enviar_resultados_para_api(query, api_endpoint):
    try:
        # Executar a consulta
        result = pd.read_gbq(credentials=credentials, query=query)
        resultados_json = result.to_dict(orient='records')

        # Enviar os resultados para a API
        api_url = api_base_url + api_endpoint
        response = requests.post(api_url, json=resultados_json)

        # Verificar se a solicitação foi bem-sucedida
        if response.status_code == 200:
            print(f"Resultados enviados com sucesso para {api_endpoint}.")
        else:
            print(
                f"Erro ao enviar resultados para {api_endpoint}. Código de status: {response.status_code}")

    except Exception as e:
        print(f"Erro ao executar a consulta ou enviar resultados: {str(e)}")


enviar_resultados_para_api(reprovacao_por_disciplina,
                           'aluno/reprovacao/disciplina')
enviar_resultados_para_api(reprovacao_por_professor,
                           'aluno/reprovacao/professor')
enviar_resultados_para_api(porcentagem_aluno_carga_horaria, 'aluno/conclusao')
enviar_resultados_para_api(Tempo_medio_conclusao_curso, 'curso/tempo_medio')
enviar_resultados_para_api(
    Tempo_conclusão_aluno_individual, 'aluno/tempo_medio')
enviar_resultados_para_api(
    Total_alunos_cursantes_e_formados, 'curso/total_cursantes')
enviar_resultados_para_api(
    Quantidade_alunos_por_periodo, 'curso/periodo/total_alunos')

print(Tempo_medio_conclusao_curso)
