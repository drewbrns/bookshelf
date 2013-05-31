import json
import bottle
from bottle import route, run, request, response, abort, template, Bottle
from pymongo import Connection
from bson.json_util import dumps

 
#Setup connection to MongoDB database
conn = Connection('localhost', 27017)
db = conn.bookshelf


app = Bottle()


@app.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """	
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


 
#Get resource
@app.route('/books', method = ['OPTIONS','GET'])
def get_books():
	request.content_type = "application/json"
	if request.method == 'OPTIONS':
		return {}
	else:
		try:
			books = db['books'].find()
			return dumps(books) 	
		except Exception as err:
			abort(404, 'No books found')
			
	
@app.route('/books/:id', method = ['OPTIONS','GET'])
def get_book(id):
	if request.method == 'OPTIONS':
		return {}
	else:
		try:
			book = db['books'].find_one({'_id':id})
			return  book 
		except Exception as err:
			abort(404, 'No book with id %s' % id)

	
#POST resource	
@app.route('/books', method = ['OPTIONS','POST'])
def post_books():
	if request.method == 'OPTIONS':
		return {}
	else: 
		books = request.json
		
		if books:
			try:
				db['books'].insert(books);
				return {"success":True}
			except Exception as err:
				return {"success": False, "error": err }


#PUT resource	
@app.route('/books/:id', method = ['OPTIONS','PUT'])
def put_book(id):
    if request.method == 'OPTIONS':
        return {}   
    else:       
        book = request.json
    
        if book:
            try: 
                db['books'].update({'_id':id}, book)
                return {"success": True}
            except Exception as err:
                return {"success": False, "error": err }


#DELETE resource
@app.route('/books/:id', method = ['OPTIONS','DELETE'])
def delete_book(id):
    if request.method == 'OPTIONS':
        return {}   
    else:	
		try:
			db['books'].remove({'_id':id})
			return {"success": True}
		except Exception as err:
			return {"success": False, "error": err }


  
app.run()

run(host='localhost', port=8080, debug=True)

### Todo:
  ##Read the bottle Api / Documentation. :: Done
  ##Learn MongoDB 						 :: Done
