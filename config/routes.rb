Rails.application.routes.draw do
    
    devise_for :users, :skip => [:sessions, :registrations]

    as :user do
        
        get "login" => "devise/sessions#new", :as => :new_user_session
        post "login" => "devise/sessions#create", :as => :user_session
        delete 'signout'  => 'devise/sessions#destroy',   :as => :destroy_user_session
            
    end
    
    root to: 'dashboard#index'

    namespace :api, defaults: {format: 'json'} do
        namespace :v1 do
            resources :appointments
            resources :patients
            
            get 'get_patient_by_name' => 'patients#get_patient_by_name' 
            
        end
    end
    
    namespace :settings do
            
        put 'general/update'

        resources :general
        resources :categories

        get 'user_management/:id/profile' => 'user_management#profile', :as => :user_management_profile
        get 'user_management/:id/edit_profile' => 'user_management#edit_profile', :as => :user_management_edit_profile
        patch 'user_management/:id/update_profile' => 'user_management#update_profile', :as => :user_management_update_profile
        get 'user_management/:id/account_settings' => 'user_management#account_settings', :as => :user_management_account_settings
        patch 'user_management/:id/update_account_settings' => 'user_management#update_account_settings', :as => :user_management_update_account_settings

        resources :user_management

    end

    get '/appointments/history' => 'appointments#history', :as => :appointment_history
    
    resources :appointments
    resources :history
    resources :follow_ups
    resources :patients

    resources :search
    
end
