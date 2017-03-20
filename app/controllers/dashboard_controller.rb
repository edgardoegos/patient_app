class DashboardController < ApplicationController
    def index

        @patients = Patient.all()
        @patient_type_ob = Patient.where('medical_record like ?', '%type":"ob%')
        @patient_type_gyne = Patient.where('medical_record like ?', '%type":"gyne%')

        @daily_appointment = Appointment.where(:consultation_date => Date.today)
        @daily_appointment_complete = Appointment.where(:consultation_date => Date.today, :status => 2)
        @daily_appointment_cancelled = Appointment.where(:consultation_date => Date.today, :status => 4)

        @appointments_current_year = Appointment.where('extract(year  from consultation_date) = ?', Date.today.year)

        if Date.today.saturday?
            @appointments_current_week = Appointment.where(:consultation_date => Date.today.at_beginning_of_week.prev_day..Date.today)
        elsif Date.today.sunday?
            @appointments_current_week = Appointment.where(:consultation_date => Date.today..(Date.today + 1.day).end_of_week.prev_day)
        else
            @appointments_current_week = Appointment.where(:consultation_date => Date.today.at_beginning_of_week.prev_day..Date.today.end_of_week.prev_day)
        end

        @appointments_current_month = Appointment.where(:consultation_date => Date.today.at_beginning_of_month..Date.today.end_of_month)

        # render json: (Date.today + 1.day).end_of_week.prev_day

    end
end
