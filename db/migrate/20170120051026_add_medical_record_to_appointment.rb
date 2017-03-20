class AddMedicalRecordToAppointment < ActiveRecord::Migration
  def change
    add_column :appointments, :medical_records, :text
  end
end
