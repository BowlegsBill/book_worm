# Boilerplate for service objects
class ApplicationService
  attr_reader :response

  private

  def response
    @response ||= Response.new
  end

  # The transactional block that we can rescue from, send error emails etc
  def transaction(&block)
    begin
      ActiveRecord::Base.transaction do
        yield
      end
    rescue => e
      response.set(errors: e) if Rails.env.development? || Rails.env.test?
      response.set(
        errors: 'There was an error whilst processing this action'
      ) unless Rails.env.development?
    end
  end

  class Response
    module Helpers
      def full_messages
        join(', ')
      end
    end

    attr_accessor :errors, :messages, :status, :data

    def initialize(errors: [], messages: [], status: 200, data: {})
      @errors = errors.extend(Helpers)
      @messages = messages.extend(Helpers)
      @status = status
      @data = data
    end

    # Always add errors into array.
    # args - single error or array of errors
    def errors=(args)
      errors.push(*args)
    end

    # Always add errors into array.
    # args - single error or array of errors
    def messages=(args)
      messages.push(*args)
    end

    def success?
      errors.blank?
    end

    # Alias for success? to make code semantical when working with resources
    def valid?
      success?
    end

    def flash
      { flash_type => flash_content }
    end

    def flash_type
      success? ? :success : :error
    end

    def flash_content
      success? ? messages.full_messages : errors.full_messages
    end

    # call method of any service object should be ended with set method
    # which returns response object
    def set(options = {})
      tap do |response|
        options.keys.each { |attr| response.send("#{attr}=", options[attr]) }
      end
    end
  end
end
