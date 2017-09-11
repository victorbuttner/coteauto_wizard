class PixelsController < ApplicationController
  before_action :set_pixel, only: [:show, :edit, :update, :destroy]

  # GET /pixels
  # GET /pixels.json
  def index
    @pixels = Pixel.all
  end

  # GET /pixels/1
  # GET /pixels/1.json
  def show
  end

  # GET /pixels/new
  def new
    @pixel = Pixel.new
  end

  # GET /pixels/1/edit
  def edit
  end

  # POST /pixels
  # POST /pixels.json
  def create
    @pixel = Pixel.new(pixel_params)

    respond_to do |format|
      if @pixel.save
        format.html { redirect_to @pixel, notice: 'Pixel was successfully created.' }
        format.json { render :show, status: :created, location: @pixel }
      else
        format.html { render :new }
        format.json { render json: @pixel.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pixels/1
  # PATCH/PUT /pixels/1.json
  def update
    respond_to do |format|
      if @pixel.update(pixel_params)
        format.html { redirect_to @pixel, notice: 'Pixel was successfully updated.' }
        format.json { render :show, status: :ok, location: @pixel }
      else
        format.html { render :edit }
        format.json { render json: @pixel.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pixels/1
  # DELETE /pixels/1.json
  def destroy
    @pixel.destroy
    respond_to do |format|
      format.html { redirect_to pixels_url, notice: 'Pixel was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pixel
      @pixel = Pixel.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pixel_params
      params.require(:pixel).permit(:text)
    end
end
