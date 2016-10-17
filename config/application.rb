require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module AngularProject
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
      
    config.assets.precompile += %w(*.png *.jpg *.jpeg *.gif)
      
    config.assets.precompile += [ 
        'appviews.css', 
        'cssanimations.css', 
        'dashboard_index.css',
        'forms.css', 
        'gallery.css', 
        'graphs.css', 
        'mailbox.css', 
        'miscellaneous.css', 
        'pages.css', 
        'tables.css', 
        'uielements.css', 
        'widgets.css', 
        'commerce.css', 
        'settings/users.css', 
        'patients.css',
        'appointments_index.css',
        'appointments_new.css',
        'appointments_edit.css',
        'follow_ups_index.css',
        'follow_ups_new.css',
        'follow_ups_edit.css',
        'patients_index.css',
        'patients_new.css',
        'patients_edit.css',
        'history_index.css',
        'settings/user_management_index.css',
        'settings/user_management_new.css',
        'settings/user_management_edit.css',
        'settings/user_management_edit_profile.css',
        'settings/user_management_account_settings.css',
        'settings/health_maintenance_organizations_index.css',
        'settings/health_maintenance_organizations_edit.css',
        'settings/general_index.css'
    ]
      
    config.assets.precompile += [ 
        'appviews.js', 
        'cssanimations.js', 
        'dashboard_index.js',
        'forms.js', 
        'gallery.js',
        'graphs.js', 
        'mailbox.js', 
        'miscellaneous.js', 
        'pages.js', 
        'tables.js', 
        'uielements.js', 
        'widgets.js', 
        'commerce.js', 
        'settings/users.js', 
        'patients.js', 
        'appointments_index.js', 
        'appointments_new.js', 
        'appointments_edit.js', 
        'follow_ups_index.js', 
        'follow_ups_new.js', 
        'follow_ups_edit.js',
        'patients_index.js',
        'patients_new.js',
        'patients_edit.js',
        'history_index.js',
        'settings/user_management_index.js',
        'settings/user_management_new.js', 
        'settings/user_management_edit.js',
        'settings/user_management_edit_profile.js',
        'settings/user_management_account_settings.js',
        'settings/health_maintenance_organizations_index.js',
        'settings/health_maintenance_organizations_edit.js',
        'settings/general_index.js'
    ]
      
      
      
  end
end
