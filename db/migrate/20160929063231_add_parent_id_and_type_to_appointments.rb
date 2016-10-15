class AddParentIdAndTypeToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :parent_id, :integer
    add_column :appointments, :appointment_type, :integer
  end
end
