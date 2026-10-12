import os
import shutil
import jinja2

PAGES = [
    ('index.html', 'index.html', '/'),
    ('dashboard.html', 'dashboard.html', '/dashboard'),
    ('register_animal.html', 'register-animal.html', '/register-animal'),
    ('manual_assessment.html', 'manual-assessment.html', '/manual-assessment'),
    ('iot_monitor.html', 'iot-monitor.html', '/iot-monitor'),
    ('photo_screening.html', 'photo-screening.html', '/photo-screening'),
    ('emergency_vet.html', 'emergency-vet.html', '/emergency-vet'),
    ('alerts.html', 'alerts.html', '/alerts'),
    ('vaccinations.html', 'vaccinations.html', '/vaccinations'),
    ('helpline_admin.html', 'helpline-admin.html', '/helpline-admin'),
    ('disease_library.html', 'disease-library.html', '/disease-library'),
    ('care_plans.html', 'care-plans.html', '/care-plans')
]

def build_site():
    print("Building static site for Netlify...")
    dist_dir = 'public'
    os.makedirs(dist_dir, exist_ok=True)

    # 1. Copy static assets
    static_dest = os.path.join(dist_dir, 'static')
    if os.path.exists(static_dest):
        shutil.rmtree(static_dest)
    shutil.copytree('static', static_dest, dirs_exist_ok=True)
    print("  Copied static/ to public/static/")

    # 2. Render Jinja templates
    env = jinja2.Environment(loader=jinja2.FileSystemLoader('templates'))

    for tmpl_name, out_file, route_path in PAGES:
        tmpl = env.get_template(tmpl_name)
        rendered = tmpl.render(request={'path': route_path})
        
        # Save root file (e.g., public/dashboard.html)
        target_path = os.path.join(dist_dir, out_file)
        with open(target_path, 'w', encoding='utf-8') as f:
            f.write(rendered)
            
        # Also save clean directory version (e.g., public/dashboard/index.html) so /dashboard and /dashboard/ load smoothly
        clean_name = route_path.strip('/')
        if clean_name:
            clean_dir = os.path.join(dist_dir, clean_name)
            os.makedirs(clean_dir, exist_ok=True)
            with open(os.path.join(clean_dir, 'index.html'), 'w', encoding='utf-8') as f:
                f.write(rendered)
                
        print(f"  Rendered {tmpl_name} -> {out_file} ({len(rendered)} bytes)")

    # Also generate a 404.html page
    tmpl = env.get_template('index.html')
    not_found = tmpl.render(request={'path': '/'})
    with open(os.path.join(dist_dir, '404.html'), 'w', encoding='utf-8') as f:
        f.write(not_found)

    print("Site build complete in 'public/'!")

if __name__ == '__main__':
    build_site()
