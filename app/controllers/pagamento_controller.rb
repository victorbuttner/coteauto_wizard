class PagamentoController < ApplicationController
  def index
  	@orcamento = Orcamento.find(params[:_id])  
  end
end
