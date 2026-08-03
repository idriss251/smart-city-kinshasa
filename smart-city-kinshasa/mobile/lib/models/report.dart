class Report{ final int? id; const Report({this.id}); factory Report.fromJson(Map<String,dynamic> j)=>Report(id:j['id']); Map<String,dynamic> toJson()=>{'id':id}; }
