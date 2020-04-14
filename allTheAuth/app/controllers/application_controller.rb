class ApplicationController < ActionController::API

    def authenticate
        begin
            authorization_header = request.headers["Authorization"]
            token = authorization_header.split(" ")[1]
            secret = Rails.application.secrets.secret_key_base
            decoded_token = JWT.decode(token, secret)
        rescue
            render json: { message: "Unauthorized!" }
        end
    end
end
