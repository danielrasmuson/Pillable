UPDATE pill
SET pill_desc='Tylenol is a pain reliever and a fever reducer.'
WHERE pill_name='tylenol';

DELETE FROM story 
WHERE story_pill_id=1676;

INSERT INTO story (story_title, story_body, story_date_created, story_difficulty, story_weight_change, story_mood_change, story_satisfaction, story_pill_id)
VALUES ('title','For Fever: Pain: not very effective. No side effects, easy to use. Fever: definitely a 10. Always helps. This got a high rating due to the fever-reducing.',now(),10,5,5,90, 1676);


INSERT INTO story (story_title, story_body, story_date_created, story_difficulty, story_weight_change, story_mood_change, story_satisfaction, story_pill_id)
VALUES ('title','For Pain: Its a good painkiller.',now(),0,0,0,80, 1676);


INSERT INTO story (story_title, story_body, story_date_created, story_difficulty, story_weight_change, story_mood_change, story_satisfaction, story_pill_id)
VALUES ('title','For Pain: It works decently, but not strong enough for my back pain.',now(),20,0,0,30, 1676);
