# Contributing to FinergyCloud

Thank you for your interest in contributing to FinergyCloud, an innovative AI-powered renewable energy investment platform. This document provides comprehensive guidelines for contributing to this professional open-source project.

## 🌱 Project Vision

FinergyCloud aims to democratize renewable energy investments through cutting-edge technology, making sustainable finance accessible while driving global environmental impact. We welcome contributions that align with our mission of innovation, sustainability, and technical excellence.

## 🛠️ Development Environment Setup

### Prerequisites
```bash
Node.js 18.0.0+
PostgreSQL 14.0+
Git 2.30.0+
VS Code (recommended)
```

### Initial Setup
```bash
# Fork and clone the repository
git clone https://github.com/your-username/FinergyCloud_Deployment.git
cd FinergyCloud_Deployment

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Add your DATABASE_URL and SESSION_SECRET

# Initialize database
npm run db:push

# Start development server
npm run dev
```

### Development Tools Configuration
```json
// .vscode/settings.json
{
  "typescript.preferences.quoteStyle": "single",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.format.enable": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## 📋 Contribution Guidelines

### Code Standards

#### TypeScript Excellence
```typescript
// ✅ Good: Comprehensive type definitions
interface InvestmentProject {
  id: number;
  name: string;
  capacity: number;
  technology: 'solar' | 'wind' | 'hydro' | 'geothermal';
  location: {
    country: string;
    region: string;
    coordinates: { lat: number; lng: number; };
  };
  financials: {
    irr: number;
    paybackPeriod: number;
    totalInvestment: number;
  };
  esgScore: ESGMetrics;
  riskAssessment: RiskProfile;
}

// ❌ Avoid: Loose typing
interface Project {
  data: any;
  info: object;
}
```

#### Component Architecture
```typescript
// ✅ Good: Well-structured React component
interface ProjectCardProps {
  project: InvestmentProject;
  onSelect: (projectId: number) => void;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onSelect, 
  className 
}) => {
  const { data: esgMetrics } = useQuery({
    queryKey: ['esg-metrics', project.id],
    queryFn: () => api.getESGMetrics(project.id)
  });

  return (
    <Card className={cn('project-card', className)}>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.technology} • {project.location.country}</CardDescription>
      </CardHeader>
      <CardContent>
        <ProjectMetrics project={project} esgScore={esgMetrics} />
      </CardContent>
      <CardFooter>
        <Button onClick={() => onSelect(project.id)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
```

#### Database Operations
```typescript
// ✅ Good: Type-safe database operations
export class ProjectService {
  async createProject(projectData: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values({
        ...projectData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    
    return project;
  }

  async getProjectWithESG(projectId: number): Promise<ProjectWithESG | null> {
    const result = await db
      .select({
        project: projects,
        esgMetrics: esgMetrics
      })
      .from(projects)
      .leftJoin(esgMetrics, eq(projects.id, esgMetrics.projectId))
      .where(eq(projects.id, projectId))
      .limit(1);

    return result[0] || null;
  }
}
```

### API Design Standards

#### RESTful Endpoints
```typescript
// ✅ Good: Comprehensive API endpoint
app.post('/api/projects', authenticateUser, async (req, res) => {
  try {
    // Validate input with Zod schema
    const projectData = insertProjectSchema.parse(req.body);
    
    // Business logic
    const project = await storage.createProject({
      ...projectData,
      userId: req.user.id
    });
    
    // Calculate initial ESG score
    const esgScore = await esgCalculator.calculateScore(project);
    await storage.createEsgMetrics({
      projectId: project.id,
      ...esgScore
    });
    
    // Return comprehensive response
    res.status(201).json({
      success: true,
      data: {
        project,
        esgScore,
        message: 'Project created successfully'
      }
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors
      });
    }
    
    console.error('Project creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});
```

### Testing Standards

#### Unit Testing
```typescript
// Example: Project service tests
describe('ProjectService', () => {
  let projectService: ProjectService;
  let mockDb: jest.Mocked<Database>;

  beforeEach(() => {
    mockDb = createMockDatabase();
    projectService = new ProjectService(mockDb);
  });

  describe('createProject', () => {
    it('should create project with valid data', async () => {
      const projectData: InsertProject = {
        name: 'Solar Farm Alpha',
        capacity: 100,
        technology: 'solar',
        location: 'California, USA',
        irr: 12.5,
        userId: 'user-123'
      };

      const expectedProject = { id: 1, ...projectData };
      mockDb.insert.mockResolvedValue([expectedProject]);

      const result = await projectService.createProject(projectData);

      expect(result).toEqual(expectedProject);
      expect(mockDb.insert).toHaveBeenCalledWith(projects);
    });

    it('should handle database errors gracefully', async () => {
      const projectData: InsertProject = { /* test data */ };
      mockDb.insert.mockRejectedValue(new Error('Database error'));

      await expect(projectService.createProject(projectData))
        .rejects.toThrow('Database error');
    });
  });
});
```

#### Integration Testing
```typescript
// Example: API endpoint integration tests
describe('POST /api/projects', () => {
  let app: Express;
  let testDb: Database;

  beforeAll(async () => {
    testDb = await setupTestDatabase();
    app = createTestApp(testDb);
  });

  afterAll(async () => {
    await cleanupTestDatabase(testDb);
  });

  it('should create project for authenticated user', async () => {
    const user = await createTestUser(testDb);
    const projectData = {
      name: 'Test Solar Project',
      capacity: 50,
      technology: 'solar',
      location: 'Test Location',
      irr: 10.5
    };

    const response = await request(app)
      .post('/api/projects')
      .set('Cookie', await getAuthCookie(user))
      .send(projectData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.project.name).toBe(projectData.name);
  });
});
```

## 🌟 Feature Development Process

### 1. Feature Planning
```markdown
## Feature Request Template

### Feature Description
Clear, concise description of the proposed feature

### Business Value
- Problem it solves
- User benefit
- Business impact

### Technical Approach
- Implementation strategy
- Database changes required
- API modifications needed
- Frontend components affected

### Acceptance Criteria
- [ ] Specific, testable requirements
- [ ] Performance criteria
- [ ] Security considerations
- [ ] Accessibility requirements

### Testing Strategy
- Unit test requirements
- Integration test scope
- Manual testing checklist
```

### 2. Development Workflow
```bash
# 1. Create feature branch
git checkout -b feature/investment-portfolio-analytics

# 2. Implement feature with tests
npm run test:watch  # Run tests during development

# 3. Ensure code quality
npm run lint
npm run type-check
npm run test

# 4. Build and test production bundle
npm run build
npm run start  # Test production build locally

# 5. Submit pull request with comprehensive description
```

### 3. Pull Request Template
```markdown
## Pull Request Description

### Changes Made
- Detailed list of changes
- New features added
- Bug fixes implemented
- Performance improvements

### Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Performance impact assessed

### Documentation
- [ ] Code comments added where necessary
- [ ] API documentation updated
- [ ] User documentation updated if applicable

### Screenshots (if UI changes)
Before: [image]
After: [image]

### Breaking Changes
List any breaking changes and migration steps

### Deployment Notes
Any special deployment considerations
```

## 🔒 Security Guidelines

### Secure Coding Practices
```typescript
// ✅ Good: Input validation and sanitization
app.post('/api/auth/login', async (req, res) => {
  try {
    // Validate input with Zod schema
    const loginData = loginSchema.parse(req.body);
    
    // Rate limiting applied at middleware level
    const user = await storage.getUserByEmail(loginData.email);
    if (!user) {
      // Prevent timing attacks - same response time for invalid users
      await bcrypt.compare('dummy', 'dummy');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(loginData.password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create secure session
    req.session.userId = user.id;
    res.json({ success: true, user: { id: user.id, email: user.email } });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Database Security
```typescript
// ✅ Good: Parameterized queries prevent SQL injection
const getUserProjects = async (userId: string): Promise<Project[]> => {
  return await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId))  // Parameterized query
    .orderBy(desc(projects.createdAt));
};

// ❌ Avoid: String concatenation vulnerable to SQL injection
const unsafeQuery = `SELECT * FROM projects WHERE user_id = '${userId}'`;
```

## 📊 Performance Guidelines

### Frontend Performance
```typescript
// ✅ Good: Optimized data fetching
const useProjectsWithPagination = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['projects', page, limit],
    queryFn: () => api.getProjects({ page, limit }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    keepPreviousData: true, // For smooth pagination
  });
};

// ✅ Good: Component optimization
const ProjectList = React.memo<ProjectListProps>(({ projects, onSelect }) => {
  const virtualizer = useVirtualizer({
    count: projects.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200, // Estimated item height
  });

  return (
    <div ref={parentRef} className="project-list">
      {virtualizer.getVirtualItems().map((virtualItem) => (
        <ProjectCard
          key={virtualItem.key}
          project={projects[virtualItem.index]}
          onSelect={onSelect}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${virtualItem.start}px)`,
          }}
        />
      ))}
    </div>
  );
});
```

### Backend Performance
```typescript
// ✅ Good: Efficient database queries with joins
const getProjectsWithMetrics = async (userId: string): Promise<ProjectWithMetrics[]> => {
  return await db
    .select({
      project: projects,
      esgScore: esgMetrics.score,
      totalInvestment: sql<number>`SUM(${investments.amount})`,
      investorCount: sql<number>`COUNT(DISTINCT ${investments.userId})`
    })
    .from(projects)
    .leftJoin(esgMetrics, eq(projects.id, esgMetrics.projectId))
    .leftJoin(investments, eq(projects.id, investments.projectId))
    .where(eq(projects.userId, userId))
    .groupBy(projects.id, esgMetrics.score)
    .orderBy(desc(projects.createdAt));
};
```

## 🌍 Accessibility Standards

### Component Accessibility
```typescript
// ✅ Good: Accessible form component
export const InvestmentForm: React.FC<InvestmentFormProps> = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  return (
    <form onSubmit={handleSubmit} role="form" aria-labelledby="investment-form-title">
      <h2 id="investment-form-title">Investment Details</h2>
      
      <div className="form-group">
        <label htmlFor="amount" className="required">
          Investment Amount
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          aria-describedby={error ? "amount-error" : undefined}
          aria-invalid={!!error}
          required
        />
        {error && (
          <div id="amount-error" role="alert" className="error-message">
            {error}
          </div>
        )}
      </div>
      
      <button type="submit" aria-describedby="submit-help">
        Submit Investment
      </button>
      <div id="submit-help" className="help-text">
        Your investment will be processed securely
      </div>
    </form>
  );
};
```

## 📖 Documentation Standards

### Code Documentation
```typescript
/**
 * Calculates comprehensive ESG score for a renewable energy project
 * 
 * @param project - The renewable energy project to evaluate
 * @param marketData - Current market conditions and regulatory environment
 * @returns Promise<ESGScore> - Comprehensive ESG evaluation with breakdown
 * 
 * @example
 * ```typescript
 * const project = await getProject(123);
 * const marketData = await getMarketData('US');
 * const esgScore = await calculateESGScore(project, marketData);
 * console.log(`ESG Score: ${esgScore.overall}/100`);
 * ```
 */
export async function calculateESGScore(
  project: InvestmentProject,
  marketData: MarketData
): Promise<ESGScore> {
  // Implementation details...
}
```

### API Documentation
```typescript
/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new renewable energy project
 *     tags: [Projects]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProjectRequest'
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectResponse'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Authentication required
 *       500:
 *         description: Internal server error
 */
```

## 🎯 Contribution Areas

### High-Priority Areas
1. **AI/ML Enhancements**: Improve prediction accuracy and add new models
2. **ESG Analytics**: Expand sustainability metrics and reporting
3. **Performance Optimization**: Database query optimization and frontend performance
4. **Security Improvements**: Additional security measures and audit features
5. **Accessibility**: WCAG 2.1 AA compliance improvements
6. **Testing Coverage**: Increase test coverage and add E2E tests

### Feature Requests Welcome
- Additional renewable energy technologies (geothermal, biomass, etc.)
- Enhanced portfolio analytics and reporting
- Social features for investor communities
- Advanced risk modeling and simulation
- Integration with external data sources
- Mobile app enhancements

## 🏆 Recognition

### Contributor Recognition
Outstanding contributors will be:
- Listed in the project's Contributors section
- Recognized in release notes for significant contributions
- Invited to participate in technical discussions and planning
- Considered for maintainer roles based on consistent, quality contributions

### Code Quality Metrics
We track and celebrate:
- Code coverage improvements
- Performance optimizations
- Security enhancements
- Accessibility improvements
- Documentation contributions

## 📞 Getting Help

### Development Support
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For technical questions and ideas
- **Code Review**: All PRs receive thorough, constructive review
- **Mentorship**: Experienced contributors help newcomers

### Communication Guidelines
- Be respectful and inclusive in all interactions
- Provide constructive feedback in code reviews
- Ask questions when unsure - learning is encouraged
- Share knowledge and help others succeed

---

Thank you for contributing to FinergyCloud and helping build the future of renewable energy investment technology!

**Project Maintainer**: Onuorah Joshua Nwani  
**Contact**: onuorahani@gmail.com  
**Repository**: https://github.com/Onuorah-Joshua-Nwani/FinergyCloud_Deployment