from flask import Blueprint, request, render_template, flash, g, session, redirect, url_for, \
                  abort, jsonify, make_response
from app import db

mod = Blueprint('emoji', __name__, template_folder='templates', static_folder='static')


#------- PAOTODO: Add s

@mod.route('/')
def index():
	return 'Hello Emoji!'