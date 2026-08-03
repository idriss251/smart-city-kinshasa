class User{ final int? id; const User({this.id}); factory User.fromJson(Map<String,dynamic> j)=>User(id:j['id']); Map<String,dynamic> toJson()=>{'id':id}; }
