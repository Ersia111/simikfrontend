import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function HeroSection() {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [activeX, setActiveX] = useState(0.5);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.offsetWidth || 800;
    const H = mount.offsetHeight || 600;

    // ── RENDERER ─────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050b1a, 1);
    renderer.domElement.style.cssText =
      "position:absolute;top:0;left:0;width:100%;height:100%;";
    mount.appendChild(renderer.domElement);

    // ── SCENE / CAMERA ────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050b1a, 0.018);

    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 300);
    camera.position.set(0, 5.5, 15);

    // ── LIGHTS ───────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x0d1f33, 3));

    const blueLight = new THREE.PointLight(0x4fc3f7, 6, 32);
    blueLight.position.set(-9.5, 5, 3);
    scene.add(blueLight);

    const greenLight = new THREE.PointLight(0x64d2a0, 6, 32);
    greenLight.position.set(9.5, 5, 3);
    scene.add(greenLight);

    const sun = new THREE.DirectionalLight(0x8ab4c4, 1.5);
    sun.position.set(0, 15, 8);
    scene.add(sun);

    // ── HELPERS ──────────────────────────────────────────────────────
    const smat = (color, emissive = 0x000000, emInt = 0) =>
      new THREE.MeshStandardMaterial({
        color,
        emissive,
        emissiveIntensity: emInt,
        metalness: 0.75,
        roughness: 0.25,
      });

    function mesh(geo, mat, x = 0, y = 0, z = 0) {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      scene.add(m);
      return m;
    }

    // ── PLATFORMS ────────────────────────────────────────────────────
    // Left – employee (blue)
    mesh(new THREE.BoxGeometry(5.2, 0.35, 5.2), smat(0x0c1e32), -9.5, 0, 0);
    mesh(new THREE.BoxGeometry(5.5, 0.07, 5.5), smat(0x1a5070, 0x4fc3f7, 0.6), -9.5, 0.21, 0);

    // Right – employer (green)
    mesh(new THREE.BoxGeometry(5.2, 0.35, 5.2), smat(0x0c2a1e), 9.5, 0, 0);
    mesh(new THREE.BoxGeometry(5.5, 0.07, 5.5), smat(0x1a5040, 0x64d2a0, 0.6), 9.5, 0.21, 0);

    // ── BRIDGE DECK ──────────────────────────────────────────────────
    mesh(new THREE.BoxGeometry(14.2, 0.18, 1.8), smat(0x081420), 0, 0.22, 0);

    // Deck accent cross-marks
    for (let x = -6; x <= 6; x += 1.5) {
      mesh(new THREE.BoxGeometry(0.06, 0.04, 1.8), smat(0x1a4060, 0x2a6080, 0.25), x, 0.33, 0);
    }

    // Railings (horizontal bars)
    mesh(new THREE.BoxGeometry(14.2, 0.05, 0.05), smat(0x1a4060, 0x3a80aa, 0.2), 0, 0.52, -0.92);
    mesh(new THREE.BoxGeometry(14.2, 0.05, 0.05), smat(0x1a4060, 0x3a80aa, 0.2), 0, 0.52, 0.92);

    // Railing posts
    for (let x = -7; x <= 7; x += 1.5) {
      mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.34, 6), smat(0x1a4060), x, 0.38, -0.92);
      mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.34, 6), smat(0x1a4060), x, 0.38, 0.92);
    }

    // ── TOWERS ───────────────────────────────────────────────────────
    const towerCaps = [];
    [
      [-9.5, 0x1a5878, 0x4fc3f7],
      [9.5, 0x1a7050, 0x64d2a0],
    ].forEach(([x, col, glow]) => {
      mesh(new THREE.BoxGeometry(0.38, 9, 0.38), smat(col, glow, 0.15), x, 4.7, 0);
      mesh(new THREE.BoxGeometry(1.5, 0.24, 0.24), smat(col, glow, 0.12), x, 7.8, 0);

      const cap = mesh(
        new THREE.SphereGeometry(0.28, 16, 16),
        new THREE.MeshStandardMaterial({
          color: glow,
          emissive: glow,
          emissiveIntensity: 2.5,
          transparent: true,
          opacity: 0.95,
        }),
        x, 9.1, 0
      );
      towerCaps.push(cap);
    });

    // ── CABLE CURVE ──────────────────────────────────────────────────
    const cableCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-9.5, 9.1, 0),
      new THREE.Vector3(0, 3.4, 0),
      new THREE.Vector3(9.5, 9.1, 0)
    );
    const cablePts = cableCurve.getPoints(100);

    // Main suspension cables
    [-0.65, 0.65].forEach((z, i) => {
      const l = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(cablePts),
        new THREE.LineBasicMaterial({
          color: i === 0 ? 0x4fc3f7 : 0x64d2a0,
          transparent: true,
          opacity: 0.7,
        })
      );
      l.position.z = z;
      scene.add(l);
    });

    // Vertical hangers
    for (let x = -7.5; x <= 7.5; x += 1.5) {
      const t = (x + 9.5) / 19;
      const cy = cableCurve.getPoint(t).y;
      const hg = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, 0.32, 0),
        new THREE.Vector3(x, cy, 0),
      ]);
      scene.add(
        new THREE.Line(
          hg,
          new THREE.LineBasicMaterial({
            color: 0x2a5878,
            transparent: true,
            opacity: 0.38,
          })
        )
      );
    }

    // ── HUMANOID FIGURES ─────────────────────────────────────────────
    function makeFigure(xPos, bodyCol, emCol, glowCol) {
      const g = new THREE.Group();

      const m = (ei = 0.3) =>
        new THREE.MeshStandardMaterial({
          color: bodyCol,
          emissive: emCol,
          emissiveIntensity: ei,
          metalness: 0.2,
          roughness: 0.65,
        });

      const part = (geo, mat, x, y, z = 0, rz = 0) => {
        const p = new THREE.Mesh(geo, mat);
        p.position.set(x, y, z);
        p.rotation.z = rz;
        g.add(p);
        return p;
      };

      // Head
      part(new THREE.SphereGeometry(0.34, 16, 16), m(0.55), 0, 2.2);
      // Neck
      part(new THREE.CylinderGeometry(0.1, 0.13, 0.3, 10), m(0.3), 0, 1.88);
      // Torso
      part(new THREE.CylinderGeometry(0.27, 0.22, 1.1, 12), m(0.22), 0, 1.34);
      // Hips
      part(new THREE.CylinderGeometry(0.22, 0.2, 0.25, 12), m(0.2), 0, 0.75);

      // Arms
      [-1, 1].forEach((s) => {
        part(new THREE.CylinderGeometry(0.09, 0.078, 0.5, 8), m(0.2), s * 0.37, 1.5, 0, s * (Math.PI / 5.5));
        part(new THREE.CylinderGeometry(0.072, 0.062, 0.46, 8), m(0.2), s * 0.48, 1.12, 0, s * (Math.PI / 4.6));
      });

      // Legs
      [-1, 1].forEach((s) => {
        part(new THREE.CylinderGeometry(0.115, 0.1, 0.54, 10), m(0.2), s * 0.15, 0.52);
        part(new THREE.CylinderGeometry(0.095, 0.082, 0.54, 10), m(0.2), s * 0.15, 0.06);
        // Feet
        const foot = new THREE.Mesh(
          new THREE.BoxGeometry(0.18, 0.1, 0.32),
          m(0.2)
        );
        foot.position.set(s * 0.15, -0.22, 0.06);
        g.add(foot);
      });

      // Aura glow sphere
      const aura = new THREE.Mesh(
        new THREE.SphereGeometry(1.0, 16, 16),
        new THREE.MeshStandardMaterial({
          color: glowCol,
          emissive: glowCol,
          emissiveIntensity: 0.9,
          transparent: true,
          opacity: 0.06,
        })
      );
      aura.position.y = 1.2;
      g.add(aura);

      // Ground ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.75, 1.55, 32),
        new THREE.MeshStandardMaterial({
          color: glowCol,
          emissive: glowCol,
          emissiveIntensity: 1.2,
          transparent: true,
          opacity: 0.22,
          side: THREE.DoubleSide,
        })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.22;
      g.add(ring);

      g.position.set(xPos, 0.18, 0);
      scene.add(g);
      return g;
    }

    const leftFig = makeFigure(-9.5, 0x1a4a6e, 0x3a80b8, 0x4fc3f7);
    const rightFig = makeFigure(9.5, 0x1a4e38, 0x3ab870, 0x64d2a0);

    // ── BRIDGE PARTICLES ─────────────────────────────────────────────
    const particles = [];
    for (let i = 0; i < 65; i++) {
      const t = Math.random();
      const c = new THREE.Color().lerpColors(
        new THREE.Color(0x4fc3f7),
        new THREE.Color(0x64d2a0),
        t
      );
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.032 + Math.random() * 0.048, 6, 6),
        new THREE.MeshStandardMaterial({
          color: c,
          emissive: c,
          emissiveIntensity: 2.5,
          transparent: true,
          opacity: 0.85,
        })
      );
      scene.add(m);
      particles.push({
        mesh: m,
        progress: Math.random(),
        speed: 0.0012 + Math.random() * 0.0045,
        z: (Math.random() - 0.5) * 1.2,
        yOff: (Math.random() - 0.5) * 0.14,
      });
    }

    // ── WATER ────────────────────────────────────────────────────────
    const wGeo = new THREE.PlaneGeometry(120, 60, 55, 55);
    const waterMesh = new THREE.Mesh(
      wGeo,
      new THREE.MeshStandardMaterial({
        color: 0x020c18,
        roughness: 0.95,
        transparent: true,
        opacity: 0.65,
      })
    );
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.y = -1.6;
    scene.add(waterMesh);
    const wAttr = wGeo.attributes.position;
    const wBase = [];
    for (let i = 0; i < wAttr.count; i++) wBase.push(wAttr.getY(i));

    // ── STARS ────────────────────────────────────────────────────────
    const sv = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      sv[i * 3] = (Math.random() - 0.5) * 140;
      sv[i * 3 + 1] = 8 + Math.random() * 45;
      sv[i * 3 + 2] = -10 - Math.random() * 100;
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute("position", new THREE.BufferAttribute(sv, 3));
    scene.add(
      new THREE.Points(
        sg,
        new THREE.PointsMaterial({ color: 0x7aaccc, size: 0.13, transparent: true, opacity: 0.5 })
      )
    );

    // ── ANIMATION LOOP ───────────────────────────────────────────────
    let tick = 0;
    let cx = 0, cy = 5.5, cz = 15, lx = 0;
    let rafId;
    let alive = true;

    function loop() {
      if (!alive) return;
      rafId = requestAnimationFrame(loop);
      tick += 0.012;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Smooth camera lerp following mouse
      cx += ((mx - 0.5) * 15 - cx) * 0.055;
      cy += (5.5 + (my - 0.5) * -1.8 - cy) * 0.055;
      cz += (14 - Math.abs(mx - 0.5) * 4.5 - cz) * 0.055;
      lx += ((mx - 0.5) * 8 - lx) * 0.055;

      camera.position.set(cx, cy, cz);
      camera.lookAt(lx * 0.38, 2.1, 0);

      // Particle flow along bridge
      particles.forEach((p) => {
        p.progress = (p.progress + p.speed) % 1;
        const pt = cableCurve.getPoint(p.progress);
        p.mesh.position.set(pt.x, 0.44 + p.yOff, p.z);
        const fade = Math.sin(p.progress * Math.PI);
        p.mesh.material.opacity = 0.12 + fade * 0.88;
        p.mesh.material.emissiveIntensity = 1.2 + fade * 2.0;
      });

      // Water waves
      for (let i = 0; i < wAttr.count; i++) {
        const wx = wAttr.getX(i),
          wz = wAttr.getZ(i);
        wAttr.setY(
          i,
          wBase[i] +
            Math.sin(wx * 0.22 + tick) * 0.14 +
            Math.cos(wz * 0.18 + tick * 0.75) * 0.1
        );
      }
      wAttr.needsUpdate = true;

      // Figure breathing
      leftFig.position.y = 0.18 + Math.sin(tick * 1.1) * 0.055;
      rightFig.position.y = 0.18 + Math.sin(tick * 1.1 + Math.PI) * 0.055;

      // Tower cap pulse
      towerCaps.forEach((cap, i) => {
        cap.material.emissiveIntensity = 2 + Math.sin(tick * (1.4 + i * 0.3)) * 1.0;
        cap.scale.setScalar(1 + Math.sin(tick * 1.7 + i) * 0.065);
      });

      // Light intensity pulse
      blueLight.intensity = 6 + Math.sin(tick * 1.2) * 1.8;
      greenLight.intensity = 6 + Math.cos(tick * 1.0) * 1.8;

      renderer.render(scene, camera);
    }

    loop();

    // ── EVENTS ───────────────────────────────────────────────────────
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      const nx = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      const ny = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
      mouseRef.current = { x: nx, y: ny };
      setActiveX(nx);
    };
    mount.addEventListener("mousemove", onMove);

    const onResize = () => {
      const nW = mount.offsetWidth,
        nH = mount.offsetHeight;
      renderer.setSize(nW, nH);
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      mount.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const isLeft = activeX < 0.5;

  return (
    <section
      ref={mountRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#050b1a",
        cursor: "crosshair",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── TOP BADGE ─────────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            padding: "0.45rem 1.2rem",
            borderRadius: "50px",
            border: "1px solid rgba(79,195,247,0.25)",
            background: "rgba(255,255,255,0.07)",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            color: "#a8d8ea",
            textTransform: "uppercase",
            backdropFilter: "blur(10px)",
          }}
        >
          Platformë për karriera në IT
        </span>
      </div>

      {/* ── CENTER HEADLINE ───────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 20,
          pointerEvents: "none",
          color: "white",
          width: "100%",
        }}
      >
        <p
          style={{
            fontSize: "0.78rem",
            letterSpacing: "0.22em",
            color: "rgba(168,216,234,0.45)",
            textTransform: "uppercase",
            margin: "0 0 0.75rem",
            fontWeight: 600,
          }}
        >
          Si Mik
        </p>
        <h1
          style={{
            fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            margin: 0,
            letterSpacing: "-0.03em",
            color: "#e8f4f8",
          }}
        >
          Connect.
          <br />
          Build.
          <br />
          Thrive.
        </h1>
        <p
          style={{
            marginTop: "1.2rem",
            fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
            color: "rgba(168,216,234,0.68)",
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: "340px",
            margin: "1.1rem auto 0",
          }}
        >
          Ura virtuale mes talenteve digjitale
          <br />
          dhe kompanive të ardhmes.
        </p>
      </div>

      {/* ── CTA BUTTONS ──────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "5.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.9rem",
          zIndex: 20,
        }}
      >
        <a
          href="/jobs"
          style={{
            padding: "0.72rem 1.9rem",
            borderRadius: "50px",
            background: "white",
            color: "#07152f",
            fontWeight: 700,
            fontSize: "0.88rem",
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            boxShadow: "0 6px 30px rgba(79,195,247,0.28)",
          }}
        >
          Explore jobs
        </a>
        <a
          href="/register"
          style={{
            padding: "0.72rem 1.9rem",
            borderRadius: "50px",
            border: "1px solid rgba(255,255,255,0.22)",
            background: "rgba(255,255,255,0.09)",
            color: "white",
            fontWeight: 700,
            fontSize: "0.88rem",
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          Post a job
        </a>
      </div>

      {/* ── EMPLOYEE CARD (left) ──────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: "2rem",
          bottom: "2rem",
          zIndex: 20,
          transition: "opacity 0.5s ease, transform 0.5s ease",
          opacity: isLeft ? 1 : 0.38,
          transform: isLeft ? "translateY(0)" : "translateY(7px)",
        }}
      >
        <div
          style={{
            background: "rgba(10,25,52,0.9)",
            border: "1px solid rgba(79,195,247,0.3)",
            borderRadius: "18px",
            padding: "1.1rem 1.4rem",
            backdropFilter: "blur(16px)",
            width: "155px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.17em",
              color: "#4fc3f7",
              textTransform: "uppercase",
            }}
          >
            Punëkërkues
          </p>
          <h3
            style={{ margin: "0.32rem 0 0", fontSize: "0.95rem", fontWeight: 900, color: "white" }}
          >
            Build profile
          </h3>
          <p
            style={{ margin: "0.22rem 0 0", fontSize: "0.76rem", color: "rgba(168,216,234,0.58)" }}
          >
            CV + Portfolio
          </p>
        </div>
      </div>

      {/* ── EMPLOYER CARD (right) ─────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          right: "2rem",
          bottom: "2rem",
          zIndex: 20,
          transition: "opacity 0.5s ease, transform 0.5s ease",
          opacity: !isLeft ? 1 : 0.38,
          transform: !isLeft ? "translateY(0)" : "translateY(7px)",
        }}
      >
        <div
          style={{
            background: "rgba(10,35,22,0.9)",
            border: "1px solid rgba(100,210,160,0.3)",
            borderRadius: "18px",
            padding: "1.1rem 1.4rem",
            backdropFilter: "blur(16px)",
            width: "155px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.17em",
              color: "#64d2a0",
              textTransform: "uppercase",
            }}
          >
            Punëdhënës
          </p>
          <h3
            style={{ margin: "0.32rem 0 0", fontSize: "0.95rem", fontWeight: 900, color: "white" }}
          >
            Find talent
          </h3>
          <p
            style={{ margin: "0.22rem 0 0", fontSize: "0.76rem", color: "rgba(168,234,200,0.58)" }}
          >
            Post IT jobs
          </p>
        </div>
      </div>

      {/* ── MOUSE HINT ───────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "2.6rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          color: "rgba(168,216,234,0.28)",
          fontSize: "0.64rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        ← lëviz mouse-in →
      </div>
    </section>
  );
}