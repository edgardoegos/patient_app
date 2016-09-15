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
    
end
