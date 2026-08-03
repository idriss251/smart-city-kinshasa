class RoadProblem{ final int? id; const RoadProblem({this.id}); factory RoadProblem.fromJson(Map<String,dynamic> j)=>RoadProblem(id:j['id']); Map<String,dynamic> toJson()=>{'id':id}; }
