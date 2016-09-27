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
        'dashboard.css', 
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
        'settings/user_management_index.css', 
        'settings/user_management_new.css',
        'settings/user_management_edit.css',
        'settings/general_index.css'
    ]
      
    config.assets.precompile += [ 
        'appviews.js', 
        'cssanimations.js', 
        'dashboard.js', 
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
        'settings/user_management_index.js',
        'settings/user_management_new.js', 
        'settings/user_management_edit.js',
        'settings/general_index.js'
    ]
      
      
      
  end
end
