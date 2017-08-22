class Orcamento

  include Mongoid::Document
  field :current_step, type: String
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
  field :vei_nacionalidade, type: String
  field :vei_marca, type: String
  field :vei_veiculo, type: String
  field :vei_modelo_ano, type: String
  field :vei_preco, type: Float
  field :vei_tipo_uso, type: String
  field :vei_placa, type: String
  field :seguro_plan, type: String
  field :seguro_preco_default, type:Float
  field :seguro_preco_silver, type:Float
  field :seguro_preco_pro, type:Float
  field :data_pgto, type: String
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
  field :seg_car_imp_reboque_300, type:Boolean
  field :seg_car_imp_reboque_500, type:Boolean
  field :seg_car_imp_terceiros_50k, type:Boolean
  field :seg_car_imp_vidros, type:Boolean
  field :seg_car_imp_reserva_7d, type:Boolean
  field :seg_car_imp_reserva14, type:Boolean


  
  after_update :set_seg_preco,  :update_seg_preco 
  #validates_presence_of :vei_tipo, if: :select_veicle_type?



  def update_seg_preco
    if(self.current_step == 'finish_profile')
    end

  end

  def set_seg_preco
    if(self.current_step == 'veicle_data')
      seg_types = Seguro.where(tipo_veiculo: self.vei_tipo)
      p "Definindo valor inicial do seguro PARTE 1"
      seg_types.each do |seguro|
        p "veiculo #{self.vei_tipo}"
        p "nacionalidade #{self.vei_nacionalidade}"
        p "valor do seguro atual #{self.seguro_preco_default}"
        p "preco do carro #{self.vei_preco}"
        p "valor inicial #{seguro.valor_incial}"
        p "valor inicial #{seguro.valor_final}"
        p "valor do seguro seguro #{seguro.preco_default}"
        p "seguro para #{seguro.tipo_veiculo}"
        if (self.vei_tipo != 'Carros')
          p "nao eh carro"
          if (self.seguro_preco_default.nil? && self.vei_preco.between?(seguro.valor_incial,seguro.valor_final) && self.vei_tipo == seguro.tipo_veiculo || (self.seguro_preco_default != seguro.preco_default && self.vei_preco.between?(seguro.valor_incial,seguro.valor_final) && self.vei_tipo == seguro.tipo_veiculo) )
              p "deu match"
              p "Definindo valor inicial do seguro IF PARTE 2"
              self.seguro_preco_default = seguro.preco_default
              self.seguro_preco_silver = seguro.preco_silver
              self.seguro_preco_pro = seguro.preco_pro

              p "Seguro definido no IF #{self.seguro_preco_default}"
              self.save
            end
            elsif ( (self.seguro_preco_default.nil? && self.vei_preco.between?(seguro.valor_incial,seguro.valor_final)  && self.vei_tipo == seguro.tipo_veiculo   && self.vei_nacionalidade == 'Nacional') || (self.seguro_preco_default != seguro.preco_default && self.vei_preco.between?(seguro.valor_incial,seguro.valor_final) && self.vei_tipo == seguro.tipo_veiculo && self.vei_nacionalidade == 'Nacional' ))
              p "carro NACIONAL"
              self.seguro_preco_default = seguro.preco_default
              self.seguro_preco_silver = seguro.preco_silver
              self.seguro_preco_pro = seguro.preco_pro              
              self.save
              elsif ((self.seguro_preco_default.nil? && self.vei_preco.between?(seguro.valor_incial,seguro.valor_final) && self.vei_tipo == 'Carros' && seguro.tipo_veiculo == self.vei_nacionalidade ) || (self.seguro_preco_default != seguro.preco_default && self.vei_preco.between?(seguro.valor_incial,seguro.valor_final) && self.vei_tipo == 'Carros' && seguro.tipo_veiculo == self.vei_nacionalidade))
                p "carro IMIPORTADO"
              self.seguro_preco_default = seguro.preco_default
              self.seguro_preco_silver = seguro.preco_silver
              self.seguro_preco_pro = seguro.preco_pro
              self.save
        end 
      end
    end
  end

  
end
