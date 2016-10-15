class Api::V1::AppointmentsController < ApplicationController

  skip_before_action :verify_authenticity_token

  respond_to :json

  def index
    respond_with Patient.all
  end

  def update

    @appointment = Appointment.find(params[:id])

    respond_to do |format|
      if @appointment.update(appointment_params)
        format.json { head :no_content, status: :ok }
        format.xml { head :no_content, status: :ok }
      else
        format.json { render json: @appointment.errors, status: :unprocessable_entity }
        format.xml { render xml: @appointment.errors, status: :unprocessable_entity }
      end
    end

  end

  def get_patient_by_name
    name = "#{params[:last_name].titlecase} #{params[:first_name].titlecase} #{params[:middle_name].titlecase}"

    @patient = Patient.where("CONCAT_WS(' ', last_name, first_name, middle_name) LIKE :q", :q => "%#{name}%").first

    if !@patient.nil?
      respond_with @patient
    else
      respond_with []
    end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:patient_id, :consultation_date, :systolic, :diastolic, :weight, :complaint, :status, :appointment_type)
  end

end