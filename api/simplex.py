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
<<<<<<< Updated upstream
	try:
		books = db['books'].find()
		if not books:
			abort(404, 'No books found')
			return {"response" : { "success":True, "data": bson.json_util.dumps(books)} } 
	except err:
		return {"response": {"success":False, "error": err} }
=======
	books = db['books'].find()
	if not books:
		abort(404, 'No books found')
	return {"response" : { "success":True, "data": bson.json_util.dumps(books)} } 
>>>>>>> Stashed changes
	
@app.route('/books/:id', method = 'GET')
def get_book(id):
	book = db['books'].find_one({'_id':id})
	if not book:
		abort(404, 'No book with id %s' % id)
<<<<<<< Updated upstream
	return {"response" : { "success":True, "data": book }
=======
	return {"response" : book }
>>>>>>> Stashed changes
	
#POST resource	
@app.route('/books', method = 'POST')
def post_books():
		
	books = request.json
	
<<<<<<< Updated upstream
	if books:
		try:
			db['books'].insert(books);
			return {"response": {"success": True }}
		except err:
			return {"response": {"success": False, "error": err }}
=======
	if books:		
		db['books'].insert(books);
		return {"success": True }
	else:
		return {"success": False}

>>>>>>> Stashed changes


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
<<<<<<< Updated upstream
	except err:
		return {"resonse": {"success": False, "error": err }}

=======
	except delError:
		return {"resonse": {"success": False}}


@app.route('/documents', method='PUT')
def put_document():
    data = request.body.readline()
    if not data:
        abort(400, 'No data received')
    entity = json.loads(data)
    if not entity.has_key('_id'):
        abort(400, 'No _id specified')
    try:
        db['documents'].save(entity)
    except ValidationError as ve:
        abort(400, str(ve))
>>>>>>> Stashed changes
  
app.run()

run(host='localhost', port=8080, debug=True)

### Todo:
  ##Read the bottle Api / Documentation. :: Done
  ##Learn MongoDB 						 :: Done
