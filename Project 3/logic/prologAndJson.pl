matrix_to_json([], []).
matrix_to_json([List | R], [JsonList | Json]):-
  list_to_json(List, JsonList),
  matrix_to_json(R, Json).

list_to_json([], []).
list_to_json([Element | Rest], [JsonElem | JsonRest]):-
  atom_concat('"', Element, JsonTemp),
  atom_concat(JsonTemp, '"', JsonElem),
  list_to_json(Rest, JsonRest).


json_to_matrix([], []).
json_to_matrix([List | R], [JsonList | Json]):-
  json_to_list(List, JsonList),
  json_to_matrix(R, Json).

json_to_list([], []).
json_to_list([Element | Rest], [JsonElem | JsonRest]):-
  atom_concat(ElemTemp,'"', JsonElem),
  atom_concat('"',Element,ElemTemp),
  json_to_list(Rest, JsonRest).
