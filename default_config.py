#Rename this file as config.py

DB_NAME_DEFAULT = 'r_on_cloud'
DB_USER_DEFAULT = 'root'
DB_PASS_DEFAULT = 'root'
DB_HOST_DEFAULT = ''
DB_PORT_DEFAULT = ''


BIN = '/usr/bin/R'

SECRET_KEY_STRING = SECRET_KEY

# request_count keeps track of the number of requests at hand, it is incremented
# when post method is invoked and decremented before exiting post method in
# class ExecutionHandler.
DEFAULT_TORNADO_WORKERS = 1
DEFAULT_REQUEST_COUNT = 1
