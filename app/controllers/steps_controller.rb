class StepsController < ApplicationController
	include Wicked::Wizard

	steps  :select_veicle_type, :veicle_data, :select_seg


	def show
		@orcamento = current_orcamento

		render_wizard

	end

	def update 

		@orcamento = current_orcamento
		@orcamento.update_attributes(orcamento_params)
		render_wizard @orcamento

	end


	def current_orcamento
		@orcamento = Orcamento.find(params[:_id])
	end 


private
	def orcamento_params
		
		params.require(:orcamento).permit(:current_step,:cli_name, :cli_email, :cli_tel, :cli_cpf, :cli_pais, :cli_trab, :cli_salario, :cli_sexo, :cli_cep, :cli_end, :cli_end_number, :cli_end_compl, :cli_end_cidade, :cli_end_bairro,:vei_tipo, :vei_marca, :vei_veiculo, :vei_modelo_ano, :vei_preco, :vei_tipo_uso, :vei_placa,:seguro_preco,:seguro_preco_final, :seg_car_reboque_300, :seg_car_reboque_500 , :seg_car_terceiros_50k , :seg_car_vidros , :seg_car_reserva_7d , :seg_car_reserva14, :vei_nacionalidade)
		  
	end




  def finish_wizard_path
     pagamento_index_path(@orcamento, :_id => @orcamento._id)
  end


end
