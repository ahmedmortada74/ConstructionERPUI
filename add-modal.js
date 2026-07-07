const fs = require('fs');
const path = require('path');

const setupDir = path.join(__dirname, 'src', 'app', 'modules', 'setup');
const dirs = fs.readdirSync(setupDir);

dirs.forEach(dir => {
  const compDir = path.join(setupDir, dir);
  if (fs.statSync(compDir).isDirectory()) {
    const tsFile = path.join(compDir, dir + '.component.ts');
    const htmlFile = path.join(compDir, dir + '.component.html');
    
    if (fs.existsSync(tsFile) && fs.existsSync(htmlFile)) {
      // Modify TS
      let tsContent = fs.readFileSync(tsFile, 'utf8');
      if (!tsContent.includes('isModalOpen')) {
        tsContent = tsContent.replace(
          'items = [',
          'isModalOpen = false;\n\n  openModal() {\n    this.isModalOpen = true;\n  }\n\n  closeModal() {\n    this.isModalOpen = false;\n  }\n\n  items = ['
        );
        fs.writeFileSync(tsFile, tsContent, 'utf8');
      }
      
      // Modify HTML
      let htmlContent = fs.readFileSync(htmlFile, 'utf8');
      if (!htmlContent.includes('modal-overlay')) {
        htmlContent = htmlContent.replace(
          /<button class="btn btn-primary">\+\s*إضافة[^<]*<\/button>/,
          match => match.replace('class="btn btn-primary"', 'class="btn btn-primary" (click)="openModal()"')
        );
        
        const modalHtml = `

  <!-- Modal Overlay -->
  <div class="modal-overlay" *ngIf="isModalOpen" (click)="closeModal()">
    <div class="modal" (click)="$event.stopPropagation()">
      <div class="modal-header">
        <h3 class="card-header-title">إضافة عنصر جديد</h3>
        <button class="btn-icon" (click)="closeModal()">&#10006;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">الكود</label>
          <input type="text" class="form-control" placeholder="أدخل الكود...">
        </div>
        <div class="form-group">
          <label class="form-label">الاسم</label>
          <input type="text" class="form-control" placeholder="أدخل الاسم...">
        </div>
        <div class="form-group">
          <label class="form-label">التفاصيل</label>
          <textarea class="form-control" placeholder="أدخل التفاصيل..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">الحالة</label>
          <select class="form-control">
            <option>نشط</option>
            <option>غير نشط</option>
          </select>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" (click)="closeModal()">إلغاء</button>
        <button class="btn btn-primary" (click)="closeModal()">حفظ</button>
      </div>
    </div>
  </div>
`;
        
        // Find the last closing div of the main container and insert before it
        const lastDivIndex = htmlContent.lastIndexOf('</div>');
        if (lastDivIndex !== -1) {
          htmlContent = htmlContent.substring(0, lastDivIndex) + modalHtml + htmlContent.substring(lastDivIndex);
          fs.writeFileSync(htmlFile, htmlContent, 'utf8');
        }
      }
    }
  }
});
