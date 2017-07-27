json.extract! cliente, :id, :nome, :email, :full_name, :cpf, :pais, :trabalha, :salario, :cep, :endereco, :end_num, :end_compl, :end_bairro, :end_cidade, :end_estado, :telefone, :created_at, :updated_at
json.url cliente_url(cliente, format: :json)
