class Seguro
  include Mongoid::Document
  field :tipo_veiculo, type: String
  field :valor_incial, type: Float
  field :valor_final, type: Float
  field :preco_silver, type: Float
  field :preco_pro , type: Float
  field :preco_default, type: Float
end
