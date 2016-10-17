class CreateHealthMaintenanceOrganizations < ActiveRecord::Migration
  def change
    create_table :health_maintenance_organizations do |t|
      t.string :name
      t.string :description
      t.integer :status

      t.timestamps null: false
    end
  end
end
