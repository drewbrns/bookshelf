import json
import bottle
from bottle import route, run, request, response, abort, template, Bottle
from pymongo import Connection
import bson.json_util
 
#Setup connection to MongoDB database
conn = Connection('localhost', 27017)
db = conn.bookshelf


app = Bottle()
 
#Get resource
@app.route('/books', method = 'GET')
def get_books():
	try:
		books = db['books'].find()
		if not books:
			abort(404, 'No books found')
			return {"response" : { "success":True, "data": bson.json_util.dumps(books)} } 
	except err:
		return {"response": {"success":False, "error": err} }
	
@app.route('/books/:id', method = 'GET')
def get_book(id):
	book = db['books'].find_one({'_id':id})
	if not book:
		abort(404, 'No book with id %s' % id)
	return {"response" : { "success":True, "data": book }

	
#POST resource	
@app.route('/books', method = 'POST')
def post_books():
		
	books = request.json
	
	if books:
		try:
			db['books'].insert(books);
			return {"response": {"success": True }}
		except err:
			return {"response": {"success": False, "error": err }}


#PUT resource	
@app.route('/books/:id', method = 'PUT')
def put_book(id):
	
	book = request.json
	
	if book:
		try: 
			db['books'].update({'_id':id}, book)
			return {"response": {"success": True}}
		except err:
			return {"response": {"success": False, "error": err } }


#DELETE resource
@app.route('/books/:id', method = 'DELETE')
def delete_book(id):
	try:
		db['books'].remove({'_id':id})
		return {"resonse": {"success": True}}
	except err:
		return {"resonse": {"success": False, "error": err }}

  
app.run()

run(host='localhost', port=8080, debug=True)

### Todo:
  ##Read the bottle Api / Documentation. :: Done
  ##Learn MongoDB 						 :: Done
