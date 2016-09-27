module ApplicationHelper
    
    @@partials = "partials/"
    
    def is_active_controller(controller_name)
        params[:controller] == controller_name ? "active" : nil
    end

    def is_active_action(action_name)
        params[:action] == action_name ? "active" : nil
    end
    
    def is_active_path(path)
        params[:controller].split('/')[0] == path ? "active" : nil
    end
    
    def partials
		{
			:form => {
                :patient => @@partials + "form_patient",
                :appointment => @@partials + "form_appointment",
                :user => @@partials + "form_user",
			}
		}
	end
    
    def format_date(datetime, format)
		return "" if datetime == nil
		datetime.localtime.strftime(format)
	end
    
    def base_url
		request.base_url
	end

	def page_url
		request.original_url
	end
    
    def get_age(birth_date)
        
        format_str = "%m/%d/" + (birth_date =~ /\d{4}/ ? "%Y" : "%y")
        date = Date.parse(birth_date) rescue Date.strptime(birth_date, format_str)
        
        now = Time.now.utc.to_date
        return now.year - date.year - (date.to_date.change(:year => now.year) > now ? 1 : 0)
        
    end
    
    def get_active_filter(button)
        
        if button == "all"
            if params[:month].present?
                return "btn-default" 
            elsif params[:date].present?
                return "btn-default"
            else
                return "btn-primary" 
            end
                
        else
            if button == "month"
                if params[:month].present?
                    return "btn-primary" 
                else
                    return "btn-default" 
                end
            else 
                if params[:date].present?
                    if params[:date] == button
                        return "btn-primary" 
                    else
                        return "btn-default" 
                    end
                else
                    return "btn-default" 
                end
            end
        end
    end
    
    # ======= NOTIFICATION ======================
    
    def flash_notifications
        message = flash[:error] || flash[:success]

        if message
          type = flash.keys[0].to_s
          javascript_tag %Q{$.notification({ message:"#{message}", type:"#{type}" });}
        end
    end
    
    def app_settings
        Setting.first
    end

    # ======= Role Permission ============================================

    def super_and_admin_roles
        return roles_include(roles.keys[0..1])
    end

    def author_role
        return roles_include(roles.keys[3])
    end

    def editor_role
        return roles_include(roles.keys[2])
    end

    def roles_include(allowed_roles)
        return allowed_roles.include?(current_user.role)
    end

    def roles
        User.roles
    end

    def permissions
        {
            settings: {
                general: {
                    allowed: [0, 1]
                },
                user_management: {
                    allowed: [0, 1]
                }
            },
            patients: {
                allowed: [:all]
            },
            appointments: {
                allowed: [:all]
            }
        }
    end

    def check_authorization
        
        permission = permissions.stringify_keys

        params[:controller].split('/').each do |key|
            if permission.has_key?(key)
                permission = permission[key].stringify_keys
            end
        end

        @@permission = permission.deep_symbolize_keys

        unless @@permission[:allowed] == [:all]
            unless @@permission[:allowed].include?(roles[current_user.role])
                
                flash[:error] = "Permission Denied!"
                redirect_to root_path
                return
            end
        end
        
    end

    def get_active_nav(nav_name)
        case params[:controller]
        when "application"
          if nav_name == params[:action]
              return "active" 
          end 
        else
          if nav_name == params[:controller]
              return "active" 
          end
        end 
    end

end
