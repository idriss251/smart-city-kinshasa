class GarbageBin{ final int? id; const GarbageBin({this.id}); factory GarbageBin.fromJson(Map<String,dynamic> j)=>GarbageBin(id:j['id']); Map<String,dynamic> toJson()=>{'id':id}; }
