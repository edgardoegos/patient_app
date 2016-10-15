class HistoryController < ApplicationController

  include ApplicationHelper

  before_action :check_authorization, :get_appointment_history

  def index
# render json: @appointment_history
  end

  private

  def get_appointment_history
    if params[:filter].present?
      if params[:filter].has_key?(:date)
        if  params[:filter][:type] .to_i == 1
          @appointment_history = Appointment.where(:consultation_date => params[:filter][:date])
        elsif params[:filter][:type].to_i == 2
            month = params[:filter][:date].split('/')[0]
            year = params[:filter][:date].split('/')[1]
            @appointment_history = Appointment.where("extract(month  from consultation_date) = ? and extract(year  from consultation_date)  = ?", month, year)
        else
          year = params[:filter][:date]
          @appointment_history = Appointment.where("extract(year  from consultation_date) = ?", year)
        end

      else
        start_date = params[:filter][:start].to_date.beginning_of_day
        end_date = params[:filter][:end].to_date.end_of_day
        @appointment_history = Appointment.where(:consultation_date => start_date..end_date)
      end
    else
        @appointment_history = Appointment.where("consultation_date < ?", Date.today)
    end
  end

end
