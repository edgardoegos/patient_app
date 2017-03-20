class AddSummaryToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :summary, :text
  end
end
