import flask
import simplejson as json

try:
    from local_settings import *
except ImportError:
    pass

from flask import render_template

app = flask.Flask(
    __name__,
    static_folder='static',
)
DEBUG = True


@app.route('/')
def hello():
    return render_template(
        'index.html',
        app_key=APP_KEY,
        master_secret=MASTER_SECRET,
    )


@app.route('/call/')
def call():
    return json.dumps({'hello': 'goodbye'})

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0')
