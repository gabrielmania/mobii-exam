# Mobii Exam

This is a sample API that has it's own SQL database.

**GET** request to */cars/showallcars*

Will return all the entry in the database in JSON format.

Sample Result:

```
  [
    {
      "id": sample_id,
      "make": Car_Make,
      "model": Car_Model,
      "year": 2000
    },
    {
      "id": sample_id,
      "make": Car_Make,
      "model": Car_Model,
      "year": 2000
    },
    {
      "id": sample_id,
      "make": Car_Make,
      "model": Car_Model,
      "year": 2000
    }
  ]
```

**POST** request to */cars*

Will post a new entry to the database. User can enter either an array or a single object in the request body.

Sample query body:

```
  [
    {
      "make": Car_Make,
      "model": Car_Model,
      "year": 2000
    },
    {
      "make": Car_Make,
      "model": Car_Model,
      "year": 2000
    }
  ]
```

User doesn't need to specify an ID when adding entry to the database.

**PUT** request to */cars*

Will update a single entry on the database. Please take note to provide the ID of the entry you are trying to edit.

Sample query body:

```
  {
    "id": sample_id,
    "make": Car_Make,
    "model": Car_Model,
    "year": 2000
  }
```

**DELETE** request to */cars/{id}*

Will delete the entry in the database. User must specify the {id} of the product they wish to delete in the database.
