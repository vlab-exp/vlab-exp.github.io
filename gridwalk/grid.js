const C = (x, y) => {
  if ( Number.isInteger(x) && Number.isInteger(y) ){
    return {x: x, y: y};
  }
  else {
    throw new TypeError("x and y must be integers");
  }
};

const ValidC = (x, y, m) => {
  const c = C(x,y);
  const in_range_x = (x) => { if (x >= 0 && x < m.grid_size.nx) return true; else return false; };
  const in_range_y = (y) => { if (y >= 0 && y < m.grid_size.ny) return true; else return false; };
  console.log(in_range_x(c.x), in_range_y(c.y));
  if (in_range_x(c.x) && in_range_y(c.y)) {
    return c;
  }
  else {
    throw new RangeError("invalid grid location: " + x + ", " + y);
  }
};

const direction = {
  UP: {name: "U", vector: [0,1]},
  DOWN: {name: "D", vector: [0,-1]},
  LEFT: {name: "L", vector: [-1,0]},
  RIGHT: {name: "R", vector: [1,0]}
};

const unit_vector_view = (dn, x_gap, y_gap) => {
  // a unit vector in the given direction, on the grid
  switch (dn) {
    case "D":
      return "v" + " " + -1 * y_gap;
    case "U":
      return "v" + " " + y_gap;
    case "R":
      return "h" + " " + x_gap;
    case "L":
      return "h" + " " + -1 * x_gap;
  }
};

const move = (m, d) => {
  try {
    m.agent_loc = ValidC(m.agent_loc.x + d.vector[0], m.agent_loc.y + d.vector[1], m);
  }
  catch (e) {
      return m;
  }
  m.agent_path = m.agent_path.concat(d.name);
  draw(m);
  show_distance(m.agent_loc, m.target_loc);
  return m;
};

const model = {
    grid_size: { nx: 5, ny: 5 },
    agent_loc:  C(0, 0),
    agent_path: [],
    target_loc: C(4, 4),
    controls: {
	directions: ["U", "D", "L", "R"]
    }
}

const set_grid_size = (m, gs) => {
  m.grid_size = gs;
  draw(m);
  return m;
};

const set_agent_loc = (m, al) => {
  m.agent_loc = al;
  draw(m);
  return m;
};

const set_target_loc = (m, tl) => {
  m.target_loc = tl;
  draw(m);
  return m;
};

const axis = (n, offset, gap) => new Array(n).fill(offset).map((a,i) => gap * i + a );

const grid_vertices = ({nx, ny, x, y, x_gap=5, y_gap=5}) => {
  const x_axis = axis(nx, x, x_gap);
  const y_axis = axis(ny, y, y_gap);
  return x_axis.map( x => y_axis.map( y => C(x,y) ) );
};

const grp = () => {
  const g_ = document.createElementNS("http://www.w3.org/2000/svg", "g");
  return g_;
};

const drawControls = (model) => {

    const x_dist = (model.target_loc.x - model.agent_loc.x);
    const y_dist = (model.target_loc.y - model.agent_loc.y);
    //console.log(manhattan_dist == 0);

  // draw an arrow
  const t = document.getElementById("view");
  const cgrp = grp();
//  cgrp.classList.add("clickable");
  //const upbtn = path("M 120 50 h 5 l -2.5 -2.5 l -2.5 2.5", "#109688", 0.1, 0, "#90A4AE", 1);
  //upbtn.classList.add("clickable");
  //upbtn.onclick = () => move(model, direction.DOWN);
  //const leftbtn = path("M 118 52 v 5 l -2.5 -2.5 l 2.5 -2.5", "#109688", 0.1, 0, "#90A4AE", 1);
  //leftbtn.classList.add("clickable");
  //leftbtn.onclick = () => move(model, direction.LEFT);
    const rightbtn = path("M 127 52 v 5 l 2.5 -2.5 l -2.5 -2.5", "#009688", 0.1, 0.2, "#B0BEC5", 1);
    const downbtn = path("M 120 59 h 5 l -2.5 2.5 l -2.5 -2.5", "#009688", 0.1, 0.2, "#B0BEC5", 1);
    if (x_dist !== 0) {
	rightbtn.classList.add("clickable");
	rightbtn.onclick = () => move(model, direction.RIGHT);
    }
    if (y_dist !== 0) {
	downbtn.classList.add("clickable");
	downbtn.onclick = () => move(model, direction.UP);
    }
    
  //cgrp.appendChild(upbtn);
  //cgrp.appendChild(leftbtn);
    cgrp.appendChild(rightbtn);
    cgrp.appendChild(downbtn);
    t.appendChild(cgrp);
};

const rect = (x, y, width, height, color) => {
  const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  r.setAttribute("x", x);
  r.setAttribute("y", y);
  r.setAttribute("width", width);
  r.setAttribute("height", height);
  r.setAttribute("fill", color);
  return r;
};

const circle = (x,y,r, color) => {
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("r", r);
  c.setAttribute("cx", x);
  c.setAttribute("cy", y);
  c.setAttribute("fill", (color || "#D4E157"));
  c.setAttribute("shape-rendering", "geometricPrecision");
  return c;
};

const path = (d, sc, sw, so, fc, fo) => {
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", d);
  p.setAttribute("stroke", sc || "#111111");
  p.setAttribute("stroke-width", sw || 2);
  p.setAttribute("stroke-opacity", so || 0.7);
  p.setAttribute("fill", fc || "#111111")
  p.setAttribute("fill-opacity", fo || 0);
  return p;
};

const text = (x, y, content) => {
  const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
  t.setAttribute("x", x);
  t.setAttribute("y", y);
  t.textContent = content;
  return t;
};

const draw_axes = (t, c, agent_loc) => {

  const x_origin = c.x - 10;
  const y_origin = c.y - 10;
  const x_axis_y = y_origin;
  const x_axis = new Array(c.nx).fill(x_axis_y).map((y, i) => { return { x: c.x +  (i * c.x_gap), y: y }});
  const y_axis = new Array(c.ny).fill(x_origin).map((x, i) => { return { x: x, y: c.y + (i * c.y_gap) }});

  // x and y axis id
  const xid = "xaxis";
  const yid = "yaxis";

  const ax_circles = x_axis.map( (p, i) => {
    if (i === agent_loc.x) { // if this is the agent's current x location.
      const circ = circle(p.x, p.y, 2, "#FFCC80");
      return circ;
    }
    else {
      return circle(p.x, p.y, 0);
    }
  });

  const ay_circles = y_axis.map( (p, i) => {
    if (i === agent_loc.y) { // if this is the agent's current y location.
      const circ = circle(p.x, p.y, 2, "#FFCC80");
      return circ;
    }
    else {
      return circle(p.x, p.y, 0);
    }
  });

  const ax_labels = x_axis.map( (p,i) => { 
    const txt = text(p.x, p.y, i); 
    //txt.setAttribute("dominant-baseline", "central"); 
    txt.setAttribute("dy", "0.35em");
    txt.setAttribute("text-anchor", "middle");
    return txt;
  });

  const ay_labels = y_axis.map( (p,i) => { 
    const txt = text(p.x, p.y, i); 
    //txt.setAttribute("dominant-baseline", "central"); 
    txt.setAttribute("dy", "0.35em");
    txt.setAttribute("text-anchor", "middle");
    return txt;
  });

  // create a group for x-axis, so that it can by replaced all at
  // once.
  const x_axis_id = "x_axis";
  const x_axis_grp = grp();
  x_axis_grp.id = x_axis_id;

  // create a group for y-axis, so that it can by replaced all at
  // once.
  const y_axis_id = "y_axis";
  const y_axis_grp = grp();
  y_axis_grp.id = y_axis_id;

  ax_circles.forEach(c => x_axis_grp.appendChild(c));
  ay_circles.forEach(c => y_axis_grp.appendChild(c));

  ax_labels.forEach(c => x_axis_grp.appendChild(c));
  ay_labels.forEach(c => y_axis_grp.appendChild(c));

  const old_x_axis_grp = t.getElementById(x_axis_id);
  if (old_x_axis_grp) t.removeChild(old_x_axis_grp);
  t.appendChild(x_axis_grp);

  const old_y_axis_grp = t.getElementById(y_axis_id);
  if (old_y_axis_grp) t.removeChild(old_y_axis_grp);
  t.appendChild(y_axis_grp);
};
const draw_grid_lines = (t, {nx, ny, x, y, x_gap, y_gap}) => {
  w = x_gap * (nx - 1);
  h = y_gap * (ny - 1);
  const x_axis = axis(nx, x, x_gap);
  const y_axis = axis(ny, y, y_gap);  
  console.log(y_axis);
  y_axis.forEach( y_ => t.appendChild(path("M" + x + " " + y_ + " " + "h" + w, "#80DEEA", 0.2, 1, null)) );
  x_axis.forEach( x_ => t.appendChild(path("M" + x_ + " " + y + " " + "v" + h, "#80DEEA", 0.2, 1, null)) );
};
const draw_grid_vertices = (target, {nx, ny, x, y, x_gap, y_gap}) => {
  const vs = grid_vertices({nx, ny, x, y, x_gap, y_gap});
  const cs = vs.flat().map(v => circle(v.x, v.y, 2, "#00BCD4"));
  cs.forEach(c => { 
    c.setAttribute("stroke", "#FFFFFF"); 
    c.setAttribute("stroke-width", 1);
    target.appendChild(c)});
};
const draw_agent_dest = (t, config, dest) => {
  const grid_loc = to_grid_coords(dest, config);
  const c = circle(grid_loc.x, grid_loc.y, 3, "#388E3C");
  t.appendChild(c);
};
const show_distance = (agent_loc, dest_loc) => {
  const id = "manhattan_dist";
  const target = document.getElementById("view");
  const manhattan_dist = (dest_loc.x - agent_loc.x) + (dest_loc.y - agent_loc.y);
  const md_text = text(122.5, 20, "Manhattan Distance: " + manhattan_dist);
  md_text.id = id;
  md_text.setAttribute("text-anchor", "middle");
  const old_md_text = document.getElementById(id);
  if (old_md_text) target.removeChild(old_md_text);
  target.appendChild(md_text);
};
const draw_agent = (t, config, p, l) => {
  const grid_loc = to_grid_coords(l, config);

  const agent_c_radius = 2;
  const c = circle(grid_loc.x, grid_loc.y, agent_c_radius, "#FDD835");
  c.setAttribute("opacity", 1);
  c.setAttribute("stroke-width", 0.3);
  c.setAttribute("stroke", "#FFFFFF");

  // create text label for current agent location
  const agent_loc_text_id = "agent_loc_text";
  const agent_loc_text = text(grid_loc.x + agent_c_radius, grid_loc.y - agent_c_radius, "(" + l.x + ", " + l.y + ")");
  agent_loc_text.id = agent_loc_text_id;


  const apid = "agent_path";
  const agent_path_trace = path( p.reduce((acc, dn) => acc + unit_vector_view(dn, config.x_gap, config.y_gap), 
                                 "M" + " " + config.x + " " + config.y), "#FFEE58", 2, 0.7);
  agent_path_trace.id = apid;
  agent_path_trace.classList.add("path-trace");
  
  // remove older path trace
  const old_ap = t.getElementById(apid);
  if (old_ap) t.removeChild(old_ap);
  t.appendChild(agent_path_trace);
  t.appendChild(c);

  // remove the previous agent location text if present.
  const old_agent_loc_text = document.getElementById(agent_loc_text_id);
  if (old_agent_loc_text) t.removeChild(old_agent_loc_text);
  t.appendChild(agent_loc_text);

  // background of the text box
  const rendered_agent_loc_text = document.getElementById(agent_loc_text_id);
  const bb = rendered_agent_loc_text.getBBox();
  const bbid = "agent_loc_text_bb";
  const agent_loc_text_bb = rect(bb.x - bb.width/10 , bb.y - bb.height/10, bb.width + bb.width/5, bb.height + bb.height/5, "#4FC3F7");
  agent_loc_text_bb.setAttribute("opacity", 0.3);
  agent_loc_text_bb.id = bbid;

  // remove the old background box of the text
  const bb_temp = document.getElementById(bbid);
  if (bb_temp) t.removeChild(bb_temp);

  // insert the new one
  t.insertBefore(agent_loc_text_bb, rendered_agent_loc_text);
};
const to_grid_coords = (model_coords, config) => {
  // convert model coordinates to grid coordinates
  return { x: config.x + model_coords.x * config.x_gap,
           y: config.y + model_coords.y * config.y_gap
         };
};
const draw = (model) => {
  const target = document.getElementById("view");
  const config = {
    nx: model.grid_size.nx,
    ny: model.grid_size.ny,
    x: 20,
    y: 20,
    x_gap: 15,
    y_gap: 15
  };

  draw_axes(target, config, model.agent_loc);
  draw_grid_lines(target, config);
  draw_grid_vertices(target, config);
  draw_agent_dest(target, config, model.target_loc);
    draw_agent(target, config, model.agent_path, model.agent_loc);
    drawControls(model);
};

window.onload = () => {
  draw(model);
  show_distance(model.agent_loc, model.target_loc);
  //move(model, direction.UP);
  
};
