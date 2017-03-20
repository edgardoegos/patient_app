class AddRecordDateManagementRecommendationsToAppointment < ActiveRecord::Migration
  def change
    add_column :appointments, :record_date, :datetime
    add_column :appointments, :management, :text
    add_column :appointments, :recommendations, :text
  end
end
