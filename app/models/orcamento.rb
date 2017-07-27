class Orcamento

  include Mongoid::Document
  field :cli_name, type: String
  field :cli_email, type: String
  field :cli_tel, type: String
  field :cli_cpf, type: String
  field :cli_pais, type: String
  field :cli_sexo, type: String
  field :cli_cep, type: String
  field :cli_end, type: String
  field :cli_end_number, type: Integer
  field :cli_end_compl, type: String
  field :cli_end_cidade, type: String
  field :cli_end_bairro, type: String
  field :vei_tipo, type: String
  field :vei_marca, type: String
  field :vei_veiculo, type: String
  field :vei_modelo_ano, type: String
  field :vei_preco, type: Float
  field :vei_tipo_uso, type: String
  field :vei_placa, type: String
  field :seguro_preco, type:Float
  field :seguro_preco_final, type:Float
  field :seg_car_reboque_300, type:Boolean
  field :seg_car_reboque_500, type:Boolean
  field :seg_car_terceiros_50k, type:Boolean
  field :seg_car_vidros, type:Boolean
  field :seg_car_reserva_7d, type:Boolean
  field :seg_car_reserva14, type:Boolean
  field :seg_moto_reboque_300, type:Boolean
  field :seg_moto_reboque_500, type:Boolean
  field :seg_cam_reboque_300, type:Boolean
  field :seg_cam_terceiros_50k, type:Boolean
  field :seg_cam_terceiros_100k, type:Boolean
  field :seg_cam_terceiros_200k, type:Boolean
  field :seg_cam_vidros, type:Boolean


  # validates_presence_of :twitter_username, if: :on_social_step?

  after_update :set_seg_preco   





  def set_seg_preco
    seg_types = Seguro.all
    p "Definindo valor inicial do seguro PARTE 1"
    seg_types.each do |seguro|
      p "valor do seguro #{self.seguro_preco}"
      p "preco do carro #{self.vei_preco}"
      p "valor inicial #{seguro.valor_incial}"
      p "valor inicial #{seguro.valor_final}"
      p "valor do seguro #{seguro.preco}"
      if (self.seguro_preco.nil? && self.vei_preco.between?(seguro.valor_incial,seguro.valor_final) || (self.seguro_preco != seguro.preco && self.vei_preco.between?(seguro.valor_incial,seguro.valor_final) ) )
          p "deu match"
          p "preco do carro #{self.vei_preco}"
          p "valor inicial #{seguro.valor_incial}"
          p "valor inicial #{seguro.valor_final}"
          p "valor do seguro #{seguro.preco}"
          p "Definindo valor inicial do seguro IF PARTE 2"
          self.seguro_preco = seguro.preco
          p "Seguro definido no IF #{self.seguro_preco}"
          self.save
           
      end 
    end

  end

  
end
