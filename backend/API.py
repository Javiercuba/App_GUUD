from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Configura o aplicativo para permitir todas as origens
resultados = {}

# Função Utilizada para os metodos POST
def receber_dados(resultados, chave):
    try:
        data = request.get_json()
        resultados[chave] = data
        return jsonify({'message': 'Resultados recebidos com sucesso.'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Função Utilizada para os metodos GET
def obter_dados(resultados, chave):
    curso_filtro = request.args.get('Curso')

    if chave in resultados:
        dados = resultados[chave]
        if curso_filtro:
            dados_filtrados = [d for d in dados if d.get('Curso') == curso_filtro]
            return jsonify(dados_filtrados)
        else:
            return jsonify(dados)
    else:
        return jsonify({'error': f'Nenhum resultado disponível para {chave}.'}), 404

@app.route('/aluno/reprovacao/professor', methods=['POST'])
def reprovacao_por_professor():
    return receber_dados(resultados, 'reprovacao_por_professor')

@app.route('/aluno/reprovacao/disciplina', methods=['POST'])
def reprovacao_por_disciplina():
    return receber_dados(resultados, 'reprovacao_por_disciplina')

@app.route('/aluno/conclusao', methods=['POST'])
def porcentagem_aluno_carga_horaria():
    return receber_dados(resultados, 'porcentagem_aluno_carga_horaria')

@app.route('/curso/tempo_medio', methods=['POST'])
def Tempo_medio_conclusão_curso():
    return receber_dados(resultados, 'tempo_medio_conclusao_curso')

@app.route('/curso/total_cursantes', methods=['POST'])
def Total_alunos_cursantes_e_formados():
    return receber_dados(resultados, 'total_alunos_cursantes_e_formados')

@app.route('/curso/periodo/total_alunos', methods=['POST'])
def Quantidade_alunos_por_periodo():
    return receber_dados(resultados, 'quantidade_alunos_por_periodo')

@app.route('/aluno/tempo_medio', methods=['POST'])
def Tempo_conclusão_aluno_individual():
    return receber_dados(resultados, 'tempo_conclusão_aluno_individual')

# ------------------------- GET ----------------------------------


@app.route('/aluno/reprovacao/professor', methods=['GET'])
def obter_dados_aluno_reprovacao_professor():
    global resultados
    if 'reprovacao_por_professor' in resultados:
        return jsonify(resultados['reprovacao_por_professor'])
    else:
        return jsonify({'error': 'Nenhum resultado disponível para aluno/reprovacao/professor.'}), 404


@app.route('/aluno/reprovacao/disciplina', methods=['GET'])
def obter_dados_aluno_reprovacao_disciplina():
    global resultados
    if 'reprovacao_por_disciplina' in resultados:
        return jsonify(resultados['reprovacao_por_disciplina'])
    else:
        return jsonify({'error': 'Nenhum resultado disponível para aluno/reprovacao/disciplina.'}), 404


@app.route('/curso/total_cursantes', methods=['GET'])
def obter_dados_total_alunos_cursantes_e_formados():
    return obter_dados(resultados, 'total_alunos_cursantes_e_formados')
    
@app.route('/aluno/conclusao', methods=['GET'])
def obter_dados_porcentagem_aluno_carga_horaria():
    return obter_dados(resultados, 'porcentagem_aluno_carga_horaria')

@app.route('/curso/tempo_medio', methods=['GET'])
def obter_dados_tempo_medio_conclusão_curso():
    return obter_dados(resultados, 'tempo_medio_conclusao_curso')

@app.route('/curso/periodo/total_alunos', methods=['GET'])
def obter_quantidade_alunos_por_periodo():
    return obter_dados(resultados, 'quantidade_alunos_por_periodo')

@app.route('/aluno/tempo_medio', methods=['GET'])
def obter_tempo_conclusão_aluno_individual():
    return obter_dados(resultados, 'tempo_conclusão_aluno_individual')

if __name__ == '__main__':
    app.run(debug=True)
