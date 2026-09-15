/* ======================================================================
   js/dashboard.js — leaderboard.html + profile.html (student area)
====================================================================== */
var LEADERBOARD=[
  {rank:1,name:'Ariel Chen',score:98,time:'22:04'},
  {rank:2,name:'Marcus Webb',score:95,time:'25:41'},
  {rank:3,name:'Priya Nair',score:93,time:'27:10'},
  {rank:4,name:'Jane Doe',score:88,time:'31:12',you:true},
  {rank:5,name:'Tomas Rey',score:85,time:'29:55'}
];

var HISTORY=[
  {no:'01',title:'General Aptitude — Round 2',meta:'Scored 8/10 · 12 Sep 2026'},
  {no:'02',title:'Basic Mathematics',meta:'Scored 17/20 · 30 Aug 2026'},
  {no:'03',title:'English Comprehension',meta:'Scored 13/15 · 18 Aug 2026'}
];

document.addEventListener('DOMContentLoaded',function(){
  // leaderboard.html
  var body=document.getElementById('leaderboard-body');
  if(body){
    LEADERBOARD.forEach(function(r){
      var tr=document.createElement('tr');
      tr.className='leaderboard-row'+(r.you?' you':'');
      tr.innerHTML='<td class="rank">#'+r.rank+'</td><td>'+r.name+(r.you?' <span class="badge ok">You</span>':'')+
        '</td><td>'+r.score+'%</td><td class="mono">'+r.time+'</td>';
      body.appendChild(tr);
    });
  }

  // profile.html
  var list=document.getElementById('profile-history-list');
  if(list){
    HISTORY.forEach(function(h){
      var row=document.createElement('div');
      row.className='ruled-item';
      row.innerHTML='<div class="no">'+h.no+'</div><div><h4>'+h.title+'</h4><div class="meta">'+h.meta+'</div></div><span class="badge ok">Completed</span>';
      list.appendChild(row);
    });
  }

  document.querySelectorAll('.tab-row button').forEach(function(btn){
    btn.addEventListener('click',function(){
      document.querySelectorAll('.tab-row button').forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      document.getElementById('profile-history').style.display = btn.dataset.tab==='history' ? 'block' : 'none';
      document.getElementById('profile-settings').style.display = btn.dataset.tab==='settings' ? 'block' : 'none';
    });
  });
});