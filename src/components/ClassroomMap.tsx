import { Seat } from './Seat';
import { ClassData, StudentData } from '../types';

interface ClassroomMapProps {
  students: StudentData[];
  currentClass: ClassData;
  onDeleteStudent: (id: string) => void;
  onUnseatStudent: (id: string) => void;
  selectedSeatId: string | null;
  onSelectSeat: (id: string) => void;
  onSelectStudent: (id: string) => void;
  isLocked: boolean;
  onUpdateRepresentative?: (value: string) => void;
  onUpdateTeacher?: (value: string) => void;
}

export function ClassroomMap({ 
  students, 
  currentClass, 
  onDeleteStudent,
  onUnseatStudent,
  selectedSeatId,
  onSelectSeat,
  onSelectStudent,
  isLocked,
  onUpdateRepresentative,
  onUpdateTeacher
}: ClassroomMapProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div id="classroom-map-container" className="w-full max-w-[95vw] mx-auto bg-white p-4 sm:p-10 shadow-lg rounded-xl border border-slate-200 print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full print:flex print:flex-col print:items-center">
      {/* Header Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-2 sm:gap-4 items-center mb-6 sm:mb-10 print:grid-cols-[120px_1fr] print:mb-6 print:w-full print:max-w-[19cm]">
        {/* Logo Column */}
        <div className="flex justify-center sm:justify-start">
          <img 
            src="https://i.ibb.co/WWK5tpDj/logo-mp.png" 
            alt="Logo" 
            className="h-20 sm:h-28 w-auto object-contain print:h-24"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Text and Fields Column */}
        <div className="flex flex-col gap-3">
          <div className="text-center">
            <h1 className="text-base sm:text-xl font-bold uppercase mb-0.5 text-slate-900 print:text-black print:text-2xl leading-tight">
              MAPEAMENTO DE SALA<br />
              <span className="text-lg sm:text-3xl print:text-4xl">TURMA: {currentClass.name}</span>
            </h1>
            {currentClass.lastUpdated && (
              <p className="text-[10px] text-slate-500 mb-1 print:text-black print:text-xs">
                Atualizado em: {formatDate(currentClass.lastUpdated)}
              </p>
            )}
            <p className="text-[10px] sm:text-sm text-slate-700 font-medium print:text-black max-w-2xl mx-auto print:text-xs print:leading-tight">
              O posicionamento de cada estudante deve ser respeitado de acordo com a organização do Mapa de Sala durante todas as aulas!
            </p>
          </div>

          {/* Editable Fields */}
          <div className="space-y-1.5 max-w-xl mx-auto w-full print:space-y-2 print:max-w-none">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <label className="text-[10px] sm:text-sm font-bold text-slate-900 uppercase whitespace-nowrap print:text-black print:text-sm">
                REPRESENTANTE DA TURMA:
              </label>
              <input 
                type="text"
                value={currentClass.classRepresentative || ''}
                onChange={(e) => onUpdateRepresentative?.(e.target.value.toUpperCase())}
                disabled={isLocked}
                className="flex-1 border-b border-slate-300 focus:border-slate-900 outline-none px-2 py-0.5 text-xs sm:text-base font-normal uppercase text-slate-800 disabled:bg-transparent disabled:border-transparent print:border-black print:text-black print:text-sm"
                placeholder="Digite o nome..."
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <label className="text-[10px] sm:text-sm font-bold text-slate-900 uppercase whitespace-nowrap print:text-black print:text-sm">
                PROFESSOR(A) REFERÊNCIA:
              </label>
              <input 
                type="text"
                value={currentClass.referenceTeacher || ''}
                onChange={(e) => onUpdateTeacher?.(e.target.value.toUpperCase())}
                disabled={isLocked}
                className="flex-1 border-b border-slate-300 focus:border-slate-900 outline-none px-2 py-0.5 text-xs sm:text-base font-normal uppercase text-slate-800 disabled:bg-transparent disabled:border-transparent print:border-black print:text-black print:text-sm"
                placeholder="Digite o nome..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-6 sm:mb-12 px-2 sm:px-4 print:mb-10 print:w-full print:max-w-none gap-2">
        <div className={`flex-1 sm:flex-none sm:w-32 h-12 sm:h-16 bg-slate-200 border-2 border-slate-400 flex items-center justify-center text-center font-bold text-[9px] sm:text-xs text-slate-700 shadow-sm print:border-black print:text-black print:h-20 print:w-48 print:text-lg ${currentClass.doorPosition === 'right' ? 'order-last' : 'order-first'}`}>
          PORTA DA<br/>SALA
        </div>
        <div className={`flex-1 sm:flex-none sm:w-32 h-12 sm:h-16 bg-slate-200 border-2 border-slate-400 flex items-center justify-center text-center font-bold text-[9px] sm:text-xs text-slate-700 shadow-sm print:border-black print:text-black print:h-20 print:w-48 print:text-lg ${currentClass.deskPosition === 'right' ? 'order-last' : 'order-first'}`}>
          MESA DO<br/>PROFESSOR
        </div>
      </div>

      <div className="overflow-x-auto pb-12 -mx-2 px-2 sm:mx-0 sm:px-0 print:overflow-visible print:pb-0 flex justify-start print:justify-center min-h-[500px] sm:min-h-0 w-full max-w-full">
        <div className="min-w-max mx-auto origin-top transition-transform duration-300 sm:scale-100 scale-[0.8] xs:scale-[0.9] sm:mb-0 -mb-[15%] xs:-mb-[5%] print:scale-100 print:mb-0 print:w-full print:flex print:justify-center">
          <div 
            className="grid gap-x-2 sm:gap-x-8 md:gap-x-16 gap-y-6 sm:gap-y-10 justify-items-center print:min-w-0 print:w-full print:gap-x-4 print:gap-y-8"
            style={{ 
              gridTemplateColumns: `repeat(${currentClass.cols}, minmax(0, 1fr))`,
              width: '100%'
            }}
          >
          {Array.from({ length: currentClass.rows }).map((_, rowIndex) => (
            Array.from({ length: currentClass.cols }).map((_, colIndex) => {
              const seatId = `seat-${rowIndex}-${colIndex}`;
              const student = students.find(s => s.seatId === seatId);
              return (
                <div key={seatId}>
                  <Seat 
                    id={seatId} 
                    student={student} 
                    onDeleteStudent={onDeleteStudent} 
                    onUnseatStudent={onUnseatStudent}
                    isSelected={selectedSeatId === seatId}
                    onSelect={() => !isLocked && onSelectSeat(seatId)}
                    onSelectStudent={onSelectStudent}
                    isLocked={isLocked}
                  />
                </div>
              );
            })
          ))}
        </div>
      </div>
    </div>
  </div>
);
}
