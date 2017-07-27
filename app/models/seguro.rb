class Seguro
  include Mongoid::Document
  field :tipo_veiculo, type: String
  field :valor_incial, type: Float
  field :valor_final, type: Float
  field :preco, type: Float
end
