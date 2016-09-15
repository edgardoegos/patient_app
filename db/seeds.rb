# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Create super_admin user

User.create(username: 'super_admin', email: 'mailer.rails@gmail.com', first_name: "Super", last_name: "Administrator", role: 0, status: 1, :password => "admin.doctor", :password_confirmation => "admin.doctor")
User.create(username: 'admin', email: 'admin@malinator.com', first_name: "Admin", last_name: "Admin", role: 1, status: 1, :password => "admin.doctor", :password_confirmation => "admin.doctor")
User.create(username: 'asistant', email: 'asistant@malinator.com', first_name: "Assistant", last_name: "Assistant", role: 2, status: 1, :password => "admin.doctor", :password_confirmation => "admin.doctor")
User.create(username: 'staff', email: 'staff@malinator.com', first_name: "Staff", last_name: "Staff", role: 3, status: 1, :password => "admin.doctor", :password_confirmation => "admin.doctor")