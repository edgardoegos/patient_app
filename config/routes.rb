Rails.application.routes.draw do
    
    devise_for :users, :skip => [:sessions, :registrations]
    
    as :user do
        
        get "/login" => "devise/sessions#new", :as => :new_user_session
        post "/login" => "devise/sessions#create", :as => :user_session
        delete '/signout'  => 'devise/sessions#destroy',   :as => :destroy_user_session
        
        # user create
        get "/settings/users/new" => "devise/registrations#new", :as => :new_user_registration
        post "/settings/users/create" => "devise/registrations#create", :as => :user_registration
        
        # user update
        get '/settings/users/:id/edit' => 'devise/registrations#edit', :as => :edit_user_registration
        put '/settings/users/update' => 'devise/registrations#update' 
        patch '/settings/users/update' => 'devise/registrations#update'
        delete '/settings/users/:id' => 'devise/registrations#destroy', :as => :settings_destroy_user
    end

    root to: 'dashboard#index'
    
    get "graphs/flot"
    get "graphs/morris"
    get "graphs/rickshaw"
    get "graphs/chartjs"
    get "graphs/chartist"
    get "graphs/peity"
    get "graphs/sparkline"
    get "graphs/c3charts"
    
    get "appviews/contacts"
    get "appviews/profile"
    get "appviews/profile_two"
    get "appviews/contacts_two"
    get "appviews/projects"
    get "appviews/project_detail"
    get "appviews/file_menager"
    get "appviews/vote_list"
    get "appviews/calendar"
    get "appviews/faq"
    get "appviews/timeline"
    get "appviews/pin_board"
    get "appviews/teams_board"
    get "appviews/social_feed"
    get "appviews/clients"
    get "appviews/outlook_view"
    get "appviews/blog"
    get "appviews/article"
    get "appviews/issue_tracker"
    
    namespace :api, defaults: {format: 'json'} do
        namespace :v1 do
            resources :appointments
            resources :patients
            
            get 'get_patient_by_name' => 'patients#get_patient_by_name' 
            
        end
    end
    
    namespace :settings do
        resources :users
    end
    get '/appointments/history' => 'appointments#history', :as => :appointment_history
    
    resources :appointments
    
    
    resources :patients
    
end
