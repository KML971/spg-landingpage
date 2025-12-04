import { useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Wizard from './components/Survey/Wizard';
import ResultsPage from './components/Results/ResultsPage';
import Footer from './components/Footer';
import { SurveyData, SurveyResult } from './types/survey';
import { calculateScore } from './utils/scoring';
import { supabase } from './lib/supabase';

type AppState = 'hero' | 'survey' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('hero');
  const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
  const [surveyResult, setSurveyResult] = useState<SurveyResult | null>(null);
  const surveyRef = useRef<HTMLDivElement>(null);

  const handleStartAssessment = () => {
    setAppState('survey');
    setTimeout(() => {
      surveyRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSurveyComplete = async (data: SurveyData) => {
    const result = calculateScore(data);
    setSurveyData(data);
    setSurveyResult(result);

    try {
      const { error } = await supabase.from('survey_responses').insert({
        user_name: data.userName,
        user_email: data.userEmail,
        company_name: data.companyName,
        products_used: data.productsUsed,
        hosting_type: data.hostingType,
        user_count: data.userCount,
        instance_count: data.instanceCount,
        marketplace_apps: data.marketplaceApps,
        critical_apps: data.criticalApps,
        custom_workflows: data.customWorkflows,
        app_categories: data.appCategories,
        integrations: data.integrations,
        sensitive_data: data.sensitiveData,
        compliance_standards: data.complianceStandards,
        it_team: data.itTeam,
        sso_requirements: data.ssoRequirements,
        migration_approach: data.migrationApproach,
        timeline_preference: data.timelinePreference,
        recent_audit: data.recentAudit,
        calculated_score: result.score,
        classification: result.classification,
        estimated_timeline: result.estimatedTimeline,
        selected_consultant: '',
        consultant_region: '',
      });

      if (error) {
        console.error('Error saving survey response:', error);
      }
    } catch (error) {
      console.error('Error saving to database:', error);
    }

    setAppState('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConsultantBooking = async (consultantName: string, region: string) => {
    if (surveyData) {
      try {
        await supabase
          .from('survey_responses')
          .update({
            selected_consultant: consultantName,
            consultant_region: region,
          })
          .eq('user_email', surveyData.userEmail)
          .order('created_at', { ascending: false })
          .limit(1);

        alert(`Thank you! We'll be in touch soon to schedule your consultation with ${consultantName}.`);
      } catch (error) {
        console.error('Error updating consultant selection:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {appState === 'hero' && <Hero onStartAssessment={handleStartAssessment} />}

      {appState === 'survey' && (
        <div ref={surveyRef}>
          <Wizard onComplete={handleSurveyComplete} />
        </div>
      )}

      {appState === 'results' && surveyData && surveyResult && (
        <ResultsPage
          data={surveyData}
          result={surveyResult}
          onBooking={handleConsultantBooking}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;
