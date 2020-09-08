db['gene-seq-infos'].find({"sequence": {$regex: ".*AALVDDAFNLAR.*"}}, {_id: 0, name: 1, description: 1})


db['gene-seq-infos'].aggregate([
    { $match: { "sequence": {$regex: ".*AGFAGDDAPR.*"}}},
    {$group: {
        _id: "$name",
        total: {$sum : 1}
        }}
])


db['gene-seq-infos'].aggregate([
    { $match: {"sequence": {$regex: ".*AALVDDAFNLAR.*"}}},
    { $project: {_id: 0, name:1}}
])


db['gene-seq-infos'].aggregate([
    { $match: {"sequence": {$regex: ".*AALVDDAFNLAR.*"}}},
    {$group: {"_id": "$name", "data": {$push: {$map: {"input": "$name", "as": "name", "in": "hello"}}}}}
])

db['gene-seq-infos'].aggregate([
    { $match: {"sequence": {$regex: ".*AALVDDAFNLAR.*"}}},
    // number of objects returns
    {$group: 
        {"_id": "$name", "data": 
        {$push: 
            {$map: 
                {"input": [0, 1], "as": "name", "in": "name"}
            }
        }
    }}
])