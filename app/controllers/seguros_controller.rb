class SegurosController < ApplicationController
  before_action :set_seguro, only: [:show, :edit, :update, :destroy]

  # GET /seguros
  # GET /seguros.json
  def index
    @seguros = Seguro.all
  end

  # GET /seguros/1
  # GET /seguros/1.json
  def show
  end

  # GET /seguros/new
  def new
    @seguro = Seguro.new
  end

  # GET /seguros/1/edit
  def edit
  end

  # POST /seguros
  # POST /seguros.json
  def create
    @seguro = Seguro.new(seguro_params)

    respond_to do |format|
      if @seguro.save
        format.html { redirect_to @seguro, notice: 'Seguro was successfully created.' }
        format.json { render :show, status: :created, location: @seguro }
      else
        format.html { render :new }
        format.json { render json: @seguro.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /seguros/1
  # PATCH/PUT /seguros/1.json
  def update
    respond_to do |format|
      if @seguro.update(seguro_params)
        format.html { redirect_to @seguro, notice: 'Seguro was successfully updated.' }
        format.json { render :show, status: :ok, location: @seguro }
      else
        format.html { render :edit }
        format.json { render json: @seguro.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /seguros/1
  # DELETE /seguros/1.json
  def destroy
    @seguro.destroy
    respond_to do |format|
      format.html { redirect_to seguros_url, notice: 'Seguro was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_seguro
      @seguro = Seguro.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def seguro_params
      params.require(:seguro).permit(:tipo_veiculo, :valor_incial, :valor_final, :preco)
    end
end
