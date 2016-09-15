class AddContactToPatients < ActiveRecord::Migration
  def change
    add_column :patients, :contact, :string
  end
end
