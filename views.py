from flask import Blueprint, request, render_template, flash, g, session, redirect, url_for, \
                  abort, jsonify, make_response
import json                  
#from app import db
UPLOAD_FOLDER = 'app/emoji/static/data/turk_submit'
mod = Blueprint('emoji', __name__, template_folder='templates', static_folder='static')


#------- PAOTODO: Add s

@mod.route('/')
def index():
	return render_template('index.html')

# @mod.route('/save_json', methods=['GET','POST'])
# def save_json():
# 	f = open('test_lala.txt', 'w')
# 	#f.write(request.args['assignmentId'])
# 	#f.close()
# 	print request.args.get('assignmentId', '')
# 	print type(request.args['assignmentId'])
# 	for key,value in request.args.iteritems():
# 		print key,":",value
# 	return "hi

@mod.route('/save_json', methods=['GET','POST'])
def save_json():
	#print type(request.json)
	with open(UPLOAD_FOLDER+'/'+request.json['workerId']+'.json','w') as f:
	   # f.write('yummy tofu')
	   json.dump(request.json, f)

	return "success"