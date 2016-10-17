# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Create super_admin user

Setting.create({ name: 'default',
    body: {
        app_name: 'Patient Record',
        app_description: '',
        app_tagline: '',
        app_about: '',
        admin_email: 'john.doe@mailinator.com',
        timezone: '',
        date_format: '',
        time_format: '',
        contact_info: ''
    }
});

User.create(username: 'super_administrator', email: 'john.doe@mailinator.com', first_name: "John", last_name: "Doe", role: 0, status: 1, gender: 0, birth_date: "17/12/1989", address: "Cecilia Chapman
711-2880 Nulla St. Mankato Mississippi", country: "United States", postal_code: "96522", phone_number: "(09) 27563-7401", :password => "admin.password", :password_confirmation => "admin.password")
User.create(username: 'administrator', email: 'mary.moe.doe@mailinator.com', first_name: "Mary", last_name: "Moe", role: 1, status: 1, gender: 1, birth_date: "23/2/1989", address: "P.O. Box 283 8562 Fusce Rd. Frederick Nebraska", country: "United States", postal_code: "20620", phone_number: "(09) 21287-2335", :password => "admin.password", :password_confirmation => "admin.password")
User.create(username: 'assistant', email: 'flex.sharp@mailinator.com', first_name: "Felix", last_name: "Sharp", role: 2, status: 1, gender: 0, birth_date: "14/5/1990", address: "Celeste Slater 606-3727 Ullamcorper. Street Roseville NH", country: "United States", postal_code: "11523", phone_number: "(09) 22713-8616", :password => "admin.password", :password_confirmation => "admin.password")
User.create(username: 'staff', email: 'thomas.yeah@mailinator.com', first_name: "Thomas", last_name: "Yeah", role: 3, status: 1, gender: 0, birth_date: "23/9/1979", address: "Theodore Lowe Ap #867-859 Sit Rd. Azusa New York", country: "United States", postal_code: "39531", phone_number: "(09) 23514-4230", :password => "admin.password", :password_confirmation => "admin.password")


HealthMaintenanceOrganization.create(name: "Maxicare", description: "");
HealthMaintenanceOrganization.create(name: "Intellicare", description: "");
HealthMaintenanceOrganization.create(name: "Asianlife", description: "");
HealthMaintenanceOrganization.create(name: "Philcare", description: "");
HealthMaintenanceOrganization.create(name: "Cocolife", description: "");