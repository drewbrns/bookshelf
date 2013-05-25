import json
import bottle
from bottle import route, run, request, abort, template, Bottle
from pymongo import Connection
import bson.json_util
 
#Setup connection to MongoDB database
conn = Connection('localhost', 27017)
db = conn.bookshelf


app = Bottle()
 
#Get resource
@app.route('/books', method = 'GET')
def get_books():
	books = db['books'].find()
	if not books:
		abort(404, 'No books found')
	return bson.json_util.dumps(books)
	
@app.route('/books/:id', method = 'GET')
def get_book(id):
	book = db['books'].find_one({'_id':id})
	if not book:
		abort(404, 'No book with id %s' % id)
	return book
	
#POST resource	
@app.route('/books', method = 'POST')
def post_books():
	return '''Created an entirely new book!'''

#PUT resource	
@app.route('/books/:id', method = 'PUT')
def put_book(id):
	return '''Editted an existing book.'''

#DELETE resource
@app.route('/books/:id', method = 'DELETE')
def delete_book(id):
	return '''Deleted Book'''


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
     
app.run()
 
run(host='localhost', port=8080)

### Todo:
  ##Read the bottle Api / Documentation.
  ##Learn MongoDB 